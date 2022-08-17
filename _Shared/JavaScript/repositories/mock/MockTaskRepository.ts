import {ITaskRepository} from "../base/ITaskRepository";
import {MockBaseRepository} from "./MockBaseRepository";
import {Task} from "../../models/Task";
import {User} from "../../models/User";

export class MockTaskRepository extends MockBaseRepository<Task> implements ITaskRepository {
    findByTitle(title: string): Promise<Task[]> {
        return Promise.resolve(this.entities.filter(e => e.title.toUpperCase().includes(title.toUpperCase())));
    }

    getUserById(id: string): Promise<User> {
        return Promise.resolve(undefined);
    }
}