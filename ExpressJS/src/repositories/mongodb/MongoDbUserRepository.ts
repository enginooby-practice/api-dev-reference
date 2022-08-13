import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {User} from "../../entities/User";
import {Model} from "mongoose";
import {UserModel} from "./MongoDbUser";
import {IUserRepository} from "../base/IUserRepository";

export class MongoDbUserRepository extends MongoDbBaseRepository<User> implements IUserRepository {
    protected model(): Model<any> {
        return UserModel;
    }

    // REFACTOR: merge code between User & Task by passing model type
    async create(entity: User): Promise<boolean> {
        const document = new UserModel(entity);
        const result = await document.save();

        if (result) {
            return Promise.resolve(true);
        }

        return Promise.reject(new Error("Failed to create."));
    }

    async findByCredentials(email: string, password: string): Promise<User> {
        // @ts-ignore
        const user = await this.model().findByCredentials(email, password);

        if (user) {
            return Promise.resolve(user as User);
        }
        // return Promise.resolve(undefined);
    }
}