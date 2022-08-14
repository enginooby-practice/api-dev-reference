import {taskRepository} from "../repositories/repositoryManager";
import {Task} from "../entities/Task";

class TaskService {
    async getAll(titleFilter?: string): Promise<Task[]> {
        if (titleFilter) {
            return taskRepository.findByTitle(titleFilter);
        }

        return taskRepository.getAll();
    }

    async findById(id: string): Promise<Task> {
        return taskRepository.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        return taskRepository.delete(id);
    }

    async create(task: Task): Promise<Task> {
        return taskRepository.create(task);
    }

    async update(id: string, content: any) {
        const updatingKeys = Object.keys(content);
        const mutableKeys = ["title", "status", "is_archived", "priority", "tags"];
        const isRequestValid = updatingKeys.every(key => mutableKeys.includes(key));

        if (isRequestValid) {
            return taskRepository.update(id, content);
        }

        throw Error("Invalid updating request (tried updating immutable/non-existing keys).");
    }
}

export const taskService = new TaskService();