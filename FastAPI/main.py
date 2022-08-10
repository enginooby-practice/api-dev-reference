from fastapi import FastAPI
from models import Todo
import json

app = FastAPI(title="Todo List")
data = []
data = json.loads(open('_Shared/todolist.json', "r").read())


@app.get("/api")
async def getAll():
    return data


@app.get("/api/{id}")
async def getOne(id: int):
    return findById(id)


@app.post("/api")
async def createOne(todo: Todo):
    data.append(todo.dict())
    return data[-1]


@app.delete("/api/{id}")
async def deleteOne(id: int):
    data.remove(findById(id))
    return {}


def findById(id: int):
    for element in data:
        if element['id'] == id:
            return element
