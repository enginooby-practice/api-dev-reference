import {IReadable} from "./IReadable";
import {IWritable} from "./IWritable";
import {User} from "../../entities/User";
import {Task} from "../../entities/Task";

export interface IUserRepository extends IReadable<User>, IWritable<User> {
    findByCredentials(email: string, password: string): Promise<User>; // ? Move to User/AuthService

    getTasksById(id: string, filter?: Partial<Task>): Promise<Task[]>;
}