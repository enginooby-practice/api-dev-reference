import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {Task} from "../../entities/Task";
import {ITaskRepository} from "../base/ITaskRepository";
import {Model} from "mongoose";
import {TaskModel} from "./MongoDbTask";

export class MongoDbTaskRepository extends MongoDbBaseRepository<Task> implements ITaskRepository {
    protected model(): Model<any> {
        return TaskModel;
    }

    findByTitle(title: string): Promise<Task[]> {
        return Promise.resolve([]);
    }
}