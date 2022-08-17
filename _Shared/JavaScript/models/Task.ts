import {IEntity} from "./IEntity";
import {ICreateDto} from "./ICreateDto";
import {ISorter, SortOrder} from "./ISorter";
import {IsEnum} from "class-validator";

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

export class TaskCreateDto implements ICreateDto {
    title?: string;
    status?: TaskStatus;
    isArchived?: boolean;
    priority?: number;
    tags?: string[];
    ownerId?: any;
}

export class TaskUpdateStatusDto {
    @IsEnum(TaskStatus, {
        message: `Task status invalid. Must be one of these values: [${Object.keys(TaskStatus)}]`,
    })
    status: TaskStatus;
}

// REFACTOR: find a TS utility type to reuse Task type instead of new interface
export interface ITaskSorter extends ISorter {
    title?: SortOrder;
    status?: SortOrder;
    timeCreated?: SortOrder;
    isArchived?: SortOrder;
    priority?: SortOrder;
}


