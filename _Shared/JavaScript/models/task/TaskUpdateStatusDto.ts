import {IsEnum} from "class-validator";
import {Task, TaskStatus} from "./Task";
import {IDto} from "../base/IDto";

export class TaskUpdateStatusDto implements IDto<Task> {
    @IsEnum(TaskStatus, {
        message: `Task status invalid. Must be one of these values: [${Object.values(TaskStatus)}]`,
    })
    status: TaskStatus;
}