import {IReadable} from "./IReadable";
import {User} from "../../entities/User";
import {IWritable} from "./IWritable";

export interface IUserRepository extends IReadable<User>, IWritable<User> {
    findByCredentials(email: string, password: string): Promise<User>; // ? Move to User/AuthService

    getTasksById(id: string): Promise<any>;
}