import {IUserRepository} from "../base/IUserRepository";
import {MockBaseRepository} from "./MockBaseRepository";
import {User} from "../../models/User";
import {ITaskSorter, Task} from "../../models/Task";
import {IPaginator} from "../../models/IPaginator";

export class MockUserRepository extends MockBaseRepository<User> implements IUserRepository {
    findByCredentials(email: string, password: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    getTasksById(id: string, filter: Partial<Task> = {}, paginator: IPaginator = {}, sorter: ITaskSorter = {}): Promise<Task[]> {
        return Promise.resolve(undefined);
    }
}