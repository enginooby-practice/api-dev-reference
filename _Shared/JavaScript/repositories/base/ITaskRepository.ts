import {Task} from "../../models/task/Task";
import {User} from "../../models/user/User";
import {ICrudable} from "./ICrudable";
import {IGetDto} from "../../models/base/IDto";

/**
 * Specific operations for the Task entity.
 */
export interface ITaskRepository extends ICrudable<Task> {
    getByTitle(title: string): Promise<Task[] | IGetDto<Task>[]>;

    getUserOf(id: string): Promise<User | IGetDto<User>>;
}