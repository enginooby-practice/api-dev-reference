import {IEntity} from "./IEntity";

export class Task implements IEntity {
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

// REFACTOR: find a TS utility type to reuse Task type instead of new interface
export interface ITaskSorter {
    title?: SortOrder;
    status?: SortOrder;
    timeCreated?: SortOrder;
    isArchived?: SortOrder;
    priority?: SortOrder;
}

export enum SortOrder {
    Esc = 1,
    Desc = -1
}

