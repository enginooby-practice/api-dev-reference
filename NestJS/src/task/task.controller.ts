import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {TaskService} from "./task.service";
import {Task, TaskStatus, TaskUpdateStatusDto} from "../_Shared/JavaScript/models/Task";
import {taskRepository} from "../_Shared/JavaScript/repositories/repositoryManager";

@Controller('api/tasks')
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @Patch("/:id/status")
    async updateTaskStatusById(@Param("id") id: string, @Body() status: TaskUpdateStatusDto) {
        // @ts-ignore
        return await taskRepository.update(id, status);
    }
}
