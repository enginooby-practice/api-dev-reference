import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {Task} from "../../entities/Task";
import {ITaskRepository} from "../base/ITaskRepository";
import {Model} from "mongoose";
import {TaskModel} from "./MongoDbTask";

export class MongoDbTaskRepository extends MongoDbBaseRepository<Task> implements ITaskRepository {
    protected model(): Model<any> {
        return TaskModel;
    }

    async create(entity: Task): Promise<Task> {
        const document = new TaskModel(entity);
        const result = await document.save();

        if (result) {
            return Promise.resolve(document);
        }

        return Promise.reject(new Error("Failed to create."));
    }

    async findByTitle(title: string): Promise<Task[]> {
        const regex = new RegExp(title, 'i') // i for case insensitive
        const documents = await this.model().find({title: {$regex: regex}});

        return Promise.resolve(documents);
    }
}