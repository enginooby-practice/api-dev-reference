import {Schema, model, connect} from "mongoose"

enum TodoStatus {
    NotStarted = "Not started",
    InProgress = "In-process",
    Completed = "Completed"
}

interface ITodo {
    id: number;
    title: string,
    status: TodoStatus,
    timeCreated: Date,
    priority: number,
    isArchived: boolean,
    tags: string[],
}

const todoSchema = new Schema<ITodo>({
    id: {type: Number, required: false},
    title: {type: String, required: true},
    status: {type: String, required: false}, // ? Create custom Mongoose type from TodoStatus enum
    timeCreated: {type: Date, required: false},
    priority: {type: Number, required: false},
    isArchived: {type: Boolean, required: false},
    tags: {type: [String], required: false}
})

export const Todo = model<ITodo>('Todo', todoSchema)

