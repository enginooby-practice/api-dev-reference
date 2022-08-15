import {IReadable} from "./IReadable";
import {IWritable} from "./IWritable";
import {User} from "../../entities/User";
import {ITaskSorter, Task} from "../../entities/Task";
import {IPaginator} from "../../entities/IPaginator";

export interface IUserRepository extends IReadable<User>, IWritable<User> {
    findByCredentials(email: string, password: string): Promise<User>; // ? Move to User/AuthService

    // Implement sorting, filtering, paginating for endpoint that may return many records
    getTasksById(id: string, filter?: Partial<Task>, paginator?: IPaginator, sorter?: ITaskSorter): Promise<Task[]>;
}