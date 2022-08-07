from fastapi import FastAPI
import json

app = FastAPI(title="To-do List")
data = json.loads(open('_Shared/todolist.json', "r").read())


@app.get("/api")
async def getAll():
    return data


@app.get("/api/{id}")
async def getOne(id: int):
    return findById(id)


def findById(id):
    for element in data:
        if element['id'] == id:
            return element
