import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {User} from "../../models/user/User";
import {Model} from "mongoose";
import {UserModel} from "./MongoDbUser";
import {IUserRepository} from "../base/IUserRepository";
import {Task} from "../../models/task/Task";
import {IPaginator} from "../../models/base/IDto";
import {TaskSortDto} from "../../models/task/TaskSortDto";

export class MongoDbUserRepository extends MongoDbBaseRepository<User> implements IUserRepository {
    protected model(): Model<any> {
        return UserModel;
    }

    // REFACTOR: merge code between User & Task by passing model type
    async create(entity: User): Promise<User> {
        const document = new UserModel(entity);
        const result = await document.save();

        if (result) {
            // @ts-ignore
            return Promise.resolve(document.toDto());
        }

        // throw new Error("Failed to create.");
        return Promise.reject(new Error(`Failed to create new ${User.name}.`));
    }

    async getByCredentials(email: string, password: string): Promise<User> {
        // @ts-ignore
        const user = await this.model().findByCredentials(email, password);

        if (user) {
            // return Promise.resolve(user.toObject() as User); // this not work if User class has methods
            return Promise.resolve(user.toDto());
        }
        // return Promise.resolve(undefined);
    }

    async getTasksOf(id: string, filter: Partial<Task> = {}, paginator: IPaginator = {}, sorter: TaskSortDto = {}): Promise<Task[]> {
        const user = await this.model().findOne({id});

        await user.populate({
            path: "tasks",
            match: filter,
            options: {
                limit: paginator.limit,
                skip: paginator.page,
                sort: sorter
            }
        });

        return Promise.resolve(user.tasks);
    }
}