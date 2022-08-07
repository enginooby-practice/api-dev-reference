from fastapi import FastAPI
import json

app = FastAPI()


@app.get("/api")
async def getAll():
    data = json.load(open('_Shared/todolist.json'))
    return data
