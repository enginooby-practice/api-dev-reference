import {Schema, model, connect} from "mongoose"

export enum TaskStatus {
    NotStarted = "Not started",
    InProgress = "In-process",
    Completed = "Completed"
}

interface ITask {
    id: number;
    title: string,
    status: TaskStatus,
    timeCreated: Date,
    priority: number,
    isArchived: boolean,
    tags: string[],
}

export class Task {
    id: number;
    isArchived: boolean;
    priority: number;
    status: TaskStatus;
    tags: string[];
    timeCreated: Date;
    title: string;
}

const taskSchema = new Schema<ITask>({
    id: {type: Number, required: false},
    title: {type: String, required: true},
    status: {type: String, required: false}, // ? Create custom Mongoose type from TodoStatus enum
    timeCreated: {type: Date, required: false},
    priority: {type: Number, required: false, default: 3},
    isArchived: {type: Boolean, required: false, default: false},
    tags: {type: [String], required: false}
})

export const TaskModel = model<ITask>('Task', taskSchema)

