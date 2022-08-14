import {IEntity} from "./IEntity";

export enum TaskStatus {
    NotStarted = "Not started",
    InProgress = "In-process",
    Completed = "Completed"
}

export class Task implements IEntity {
    id: string;
    title: string;
    status: TaskStatus;
    timeCreated: Date;
    isArchived: boolean;
    priority: number;
    tags: string[];
}


