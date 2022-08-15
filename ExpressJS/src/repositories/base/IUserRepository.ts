import {IReadable} from "./IReadable";
import {IWritable} from "./IWritable";
import {User} from "../../entities/User";
import {ITaskFilter, Task} from "../../entities/Task";

export interface IUserRepository extends IReadable<User>, IWritable<User> {
    findByCredentials(email: string, password: string): Promise<User>; // ? Move to User/AuthService

    getTasksById(id: string, filter?: ITaskFilter): Promise<Task[]>;
}