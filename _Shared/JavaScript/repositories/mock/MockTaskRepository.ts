import {ITaskRepository} from "../base/ITaskRepository";
import {MockBaseRepository} from "./MockBaseRepository";
import {Task} from "../../models/task/Task";
import {User} from "../../models/user/User";

export class MockTaskRepository extends MockBaseRepository<Task> implements ITaskRepository {
    getByTitle(title: string): Promise<Task[]> {
        return Promise.resolve(this.entities.filter(e => e.title.toUpperCase().includes(title.toUpperCase())));
    }

    getUserOf(id: string): Promise<User> {
        return Promise.resolve(undefined);
    }
}