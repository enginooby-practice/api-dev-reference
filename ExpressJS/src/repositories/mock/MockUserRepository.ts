import {User} from "../../entities/User";
import {IUserRepository} from "../base/IUserRepository";
import {MockBaseRepository} from "./MockBaseRepository";
import {ITaskFilter, Task} from "../../entities/Task";

export class MockUserRepository extends MockBaseRepository<User> implements IUserRepository {
    findByCredentials(email: string, password: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    getTasksById(id: string, filter: ITaskFilter = {}): Promise<Task[]> {
        return Promise.resolve(undefined);
    }
}