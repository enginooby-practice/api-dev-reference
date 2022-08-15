import {IWritable} from "./IWritable";
import {IReadable} from "./IReadable";
import {Task} from "../../entities/Task";
import {User} from "../../entities/User";

/**
 * Specific operations for the Task entity.
 */
export interface ITaskRepository extends IWritable<Task>, IReadable<Task> {
    findByTitle(title: string): Promise<Task[]>;

    getUserById(id: string): Promise<User>;
}