import {Task} from "../../models/Task";
import {User} from "../../models/User";
import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {ITaskRepository} from "../base/ITaskRepository";
import {Model} from "mongoose";
import {TaskModel} from "./MongoDbTask";
import {ObjectId} from "mongodb";
import {userRepository} from "../repositoryManager"; // ? DECOUPLE

export class MongoDbTaskRepository extends MongoDbBaseRepository<Task> implements ITaskRepository {
    protected model(): Model<any> {
        return TaskModel;
    }

    async create(entity: Task): Promise<Task> {
        const user = await userRepository.findById(entity.ownerId);
        // @ts-ignore
        entity.ownerId = new ObjectId(user._id);
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

    async getUserById(id: string): Promise<User> {
        const task = await this.model().findOne({id});
        await task.populate('ownerId');

        return Promise.resolve(task.ownerId);
    }
}