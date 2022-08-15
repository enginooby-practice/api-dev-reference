import {taskRepository, userRepository} from "../repositories/repositoryManager";
import {Task} from "../entities/Task";
import {IPaginator} from "../entities/IPaginator";

class TaskService {
    async doesUserOwnTask(userId: string, taskId: string): Promise<boolean> {
        const tasks = await userRepository.getTasksById(userId);
        for (const task of tasks) {
            if (task.id == taskId) {
                return Promise.resolve(true);
            }
        }

        return Promise.resolve(false);
    }

    async getAll(userId: any, titleFilter?: string, filter?: Partial<Task>, paginator?: IPaginator): Promise<Task[]> {
        if (titleFilter) {
            // TODO
            const tasks = await taskRepository.findByTitle(titleFilter);
            return tasks.filter(task => task.ownerId == userId);
        }

        return userRepository.getTasksById(userId, filter, paginator);
    }

    async findById(userId: any, id: string): Promise<Task> {
        if (!await this.doesUserOwnTask(userId, id)) return;

        return taskRepository.findById(id);
    }

    async delete(userId: any, id: string): Promise<boolean> {
        if (!await this.doesUserOwnTask(userId, id)) return;

        return taskRepository.delete(id);
    }

    async create(userId: any, task: Task): Promise<Task> {
        return taskRepository.create({...task, ownerId: userId});
    }

    async update(userId: any, id: string, content: any): Promise<boolean> {
        if (!await this.doesUserOwnTask(userId, id)) return;

        const updatingKeys = Object.keys(content);
        const mutableKeys = ["title", "status", "isArchived", "priority", "tags"];
        const canUpdate = updatingKeys.every(key => mutableKeys.includes(key));

        if (canUpdate) {
            return taskRepository.update(id, content);
        }

        throw Error("Invalid updating request (tried updating immutable/non-existing keys).");
    }
}

export const taskService = new TaskService();