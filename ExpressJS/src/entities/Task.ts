import {IEntity} from "./IEntity";

export enum TaskStatus {
    NotStarted = "Not started",
    InProgress = "In-process",
    Completed = "Completed"
}

// export interface ITask {
//     id: number;
//     title: string,
//     status: TaskStatus,
//     timeCreated: Date,
//     priority: number,
//     isArchived: boolean,
//     tags: string[],
// }

export class Task implements IEntity {
    id: string;
    isArchived: boolean;
    priority: number;
    status: TaskStatus;
    tags: string[];
    timeCreated: Date;
    title: string;
}


