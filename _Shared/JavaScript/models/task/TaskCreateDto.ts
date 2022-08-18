import {ICreateDto} from "../base/IDto";
import {Task, TaskStatus} from "./Task";

export class TaskCreateDto implements ICreateDto<Task> {
    title?: string;
    status?: TaskStatus;
    isArchived?: boolean;
    priority?: number;
    tags?: string[];
    ownerId?: any;
}