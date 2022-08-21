import {ITaskRepository} from "../base/ITaskRepository";
import {JsonBaseRepository} from "./JsonBaseRepository";
import {Task} from "../../models/task/Task";
import {User} from "../../models/user/User";

export class JsonTaskRepository extends JsonBaseRepository<Task> implements ITaskRepository {
    getByTitle(title: string): Promise<Task[]> {
        return Promise.resolve(this.entities.filter(e => e.title.toUpperCase().includes(title.toUpperCase())));
    }

    getUserOf(id: string): Promise<User> {
        return Promise.reject(new Error("Not implemented"));
    }
}