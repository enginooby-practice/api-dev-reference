import {Task} from "../entities/Task";

/**
 * Specific operations for the Task entity.
 */
export interface ITaskRepository {
    findByTitle(title: string): Promise<Task[]>;
}