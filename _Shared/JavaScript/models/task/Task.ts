import {IModel} from "../base/IModel";
import {IUpdateDto} from "../base/IDto";

export class Task implements IModel, IUpdateDto<Task> {
    id: string;
    title: string;
    status: TaskStatus;
    timeCreated: Date;
    isArchived: boolean;
    priority: number;
    tags: string[];
    ownerId: any;

    applyUpdate(dto: Task): void {
        this.title = dto.title ?? this.title;
        this.status = dto.status ?? this.status;
        this.isArchived = dto.isArchived ?? this.isArchived;
        this.priority = dto.priority ?? this.priority;
        this.tags = dto.tags ?? this.tags;
    }
}

export enum TaskStatus {
    NotStarted = "Not started",
    InProgress = "In progress",
    Completed = "Completed"
}

