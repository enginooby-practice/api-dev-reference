import {Task} from "../../entities/Task";
import {IWritable} from "./IWritable";
import {IReadable} from "./IReadable";

/**
 * Specific operations for the Task entity.
 */
export interface ITaskRepository extends IWritable<Task>, IReadable<Task> {
    findByTitle(title: string): Promise<Task[]>;
}