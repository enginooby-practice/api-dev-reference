import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {Task} from "../_Shared/JavaScript/models/task/Task";
import {TaskUpdateStatusDto} from "../_Shared/JavaScript/models/task/TaskUpdateStatusDto";
import {TaskService} from "./task.service";
import {taskRepository} from "../_Shared/JavaScript/repositories/repositoryManager";

@Controller('api/tasks')
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @Get()
    async getTasks() {
        return await taskRepository.getAll();
    }

    @Get("/:id")
    async getTaskById(@Param("id") id: string) {
        // bypass auth for now, so don't use TaskService but TaskRepository directly
        return await taskRepository.getById(id);
    }

    @Delete("/:id")
    async deleteTaskById(@Param("id") id: string) {
        return await taskRepository.delete(id);
    }

    @Post()
    async createTask(@Body() task: Task) {
        return await taskRepository.create(task);
    }

    @Patch("/:id/status")
    async updateTaskStatusById(@Param("id") id: string, @Body() status: TaskUpdateStatusDto) {
        // @ts-ignore
        return await taskRepository.update(id, status);
    }
}
