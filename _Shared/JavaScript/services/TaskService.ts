import {taskRepository, userRepository} from "../repositories/repositoryManager";
import {Task} from "../models/task/Task";
import {IGetDto, IPaginator} from "../models/base/IDto";
import {v4 as uuid} from "uuid";
import {TaskSortDto} from "../models/task/TaskSortDto";

export class TaskService {
    // * cross-model validation
    async doesUserOwnTask(userId: string, taskId: string): Promise<boolean> {
        const tasks = await userRepository.getTasksOf(userId);

        for (const task of tasks) {
            if ((task as Task).id == taskId) {
                return Promise.resolve(true);
            }
        }

        return Promise.resolve(false);
    }

    async getAll(userId: any, titleFilter?: string, filter?: Partial<Task>, paginator?: IPaginator, sorter?: TaskSortDto): Promise<Task[] | IGetDto<Task>[]> {
        if (titleFilter) {
            // TODO
            const tasks = await taskRepository.getByTitle(titleFilter);
            return tasks.filter(task => task.ownerId == userId);
        }

        return await userRepository.getTasksOf(userId, filter, paginator, sorter);
    }

    async findById(userId: any, id: string): Promise<Task | IGetDto<Task>> {
        if (!await this.doesUserOwnTask(userId, id)) return;

        return await taskRepository.getById(id);
    }

    async delete(userId: any, id: string): Promise<boolean> {
        if (!await this.doesUserOwnTask(userId, id)) return;

        return await taskRepository.delete(id);
    }

    async create(userId: any, task: Task): Promise<Task> {
        return await taskRepository.create({...task, ownerId: userId, id: uuid()});
    }

    async update(userId: any, id: string, content: any): Promise<boolean> {
        if (!await this.doesUserOwnTask(userId, id)) return;

        const updatingKeys = Object.keys(content);
        const mutableKeys = ["title", "status", "isArchived", "priority", "tags"];
        const canUpdate = updatingKeys.every(key => mutableKeys.includes(key));

        if (canUpdate) {
            return await taskRepository.update(id, content);
        }

        throw Error("Invalid updating request (tried updating immutable/non-existing keys).");
    }
}

export const taskService = new TaskService();