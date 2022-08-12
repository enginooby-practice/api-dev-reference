import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {Task} from "../../entities/Task";
import {ITaskRepository} from "../base/ITaskRepository";

export class MongoDbTaskRepository extends MongoDbBaseRepository<Task> implements ITaskRepository {
    findByTitle(title: string): Promise<Task[]> {
        return Promise.resolve([]);
    }
}