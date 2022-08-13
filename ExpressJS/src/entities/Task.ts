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

    /**
     * List of fields that can be changed via APIs.
     */
    static getMutableKeys(): string[] {
        return ["title", "status", "is_archived", "priority", "tags"];
    }
}


