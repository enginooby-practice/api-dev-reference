import {Task} from "../entities/Task";
import {IWritable} from "./base/IWritable";
import {IReadable} from "./base/IReadable";

/**
 * Specific operations for the Task entity.
 */
export interface ITaskRepository extends IWritable<Task>, IReadable<Task> {
    findByTitle(title: string): Promise<Task[]>;
}