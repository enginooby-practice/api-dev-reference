import {IModel} from "../base/IModel";
import {IUpdateDto} from "../base/IDto";

export class Task implements IModel {
    id: string;
    title: string;
    status: TaskStatus;
    timeCreated: Date;
    isArchived: boolean;
    priority: number;
    tags: string[];
    ownerId: any;

    applyUpdate(dto: IUpdateDto<Task>): void {
    }
}

export enum TaskStatus {
    NotStarted = "Not started",
    InProgress = "In progress",
    Completed = "Completed"
}

