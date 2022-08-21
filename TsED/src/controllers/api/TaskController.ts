import {Controller} from "@tsed/di";
import {Delete, Get, Patch, Post} from "@tsed/schema";
import {BodyParams, PathParams} from "@tsed/platform-params";
import {Task} from "../../_Shared/JavaScript/models/task/Task";
import {TaskCreateDto} from "../../_Shared/JavaScript/models/task/TaskCreateDto";
import {taskRepository} from "../../_Shared/JavaScript/repositories/repositoryManager";

@Controller("/tasks")
export class TaskController {
  @Get("/")
  async get() {
    return await taskRepository.getAll();
  }

  @Get("/:id")
  async getById(@PathParams("id") id: string) {
    return await taskRepository.getById(id);
  }

  @Post()
  async create(@BodyParams() dto: TaskCreateDto){
    return await taskRepository.create(dto);
  }

  @Delete("/:id")
  async delete(@PathParams("id") id: string){
    return await taskRepository.delete(id);
  }

  @Patch("/:id")
  async update(@PathParams("id") id: string, @BodyParams() dto: Task){
    return await taskRepository.update(id, dto);
  }
}