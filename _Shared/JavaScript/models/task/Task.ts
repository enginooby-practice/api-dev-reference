import {IModel} from "../base/IModel";

export class Task implements IModel {
    id: string;
    title: string;
    status: TaskStatus;
    timeCreated: Date;
    isArchived: boolean;
    priority: number;
    tags: string[];
    ownerId: any;
}

export enum TaskStatus {
    NotStarted = "Not started",
    InProgress = "In progress",
    Completed = "Completed"
}

