import {model, Schema} from "mongoose";
import {Task} from "../../entities/Task";

const taskSchema = new Schema<Task>({
    id: {type: String, required: false},
    title: {type: String, required: true},
    status: {type: String, required: false}, // ? Create custom Mongoose type from TodoStatus enum
    timeCreated: {type: Date, required: false},
    priority: {type: Number, required: false, default: 3},
    isArchived: {type: Boolean, required: false, default: false},
    tags: {type: [String], required: false}
})

export const TaskModel = model<Task>('Task', taskSchema)