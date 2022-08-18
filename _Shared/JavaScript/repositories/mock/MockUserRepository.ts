import {IUserRepository} from "../base/IUserRepository";
import {MockBaseRepository} from "./MockBaseRepository";
import {User} from "../../models/user/User";
import {Task} from "../../models/task/Task";
import {IPaginator} from "../../models/base/IDto";
import {TaskSortDto} from "../../models/task/TaskSortDto";

export class MockUserRepository extends MockBaseRepository<User> implements IUserRepository {
    getByCredentials(email: string, password: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    getTasksOf(id: string, filter: Partial<Task> = {}, paginator: IPaginator = {}, sorter: TaskSortDto = {}): Promise<Task[]> {
        return Promise.resolve(undefined);
    }
}