import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {Task} from "../../entities/Task";
import {ITaskRepository} from "../base/ITaskRepository";
import {Model} from "mongoose";
import {TaskModel} from "./MongoDbTask";

export class MongoDbTaskRepository extends MongoDbBaseRepository<Task> implements ITaskRepository {
    protected model(): Model<any> {
        return TaskModel;
    }

    async create(entity: Task): Promise<boolean> {
        const document = new TaskModel(entity);
        const result = await document.save();

        if (result) {
            return Promise.resolve(true);
        }

        return Promise.reject(new Error("Failed to create."));
    }

    findByTitle(title: string): Promise<Task[]> {
        return Promise.resolve([]);
    }
}