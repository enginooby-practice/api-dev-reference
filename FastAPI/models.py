from pydantic import BaseModel


class Todo(BaseModel):
    id: int
    title: str
    content: str
    status: str
    time_created: str
    is_archived: bool
    priority: int
    # tag: array

