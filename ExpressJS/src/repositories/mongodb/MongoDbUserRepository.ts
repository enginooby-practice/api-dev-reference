import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {User} from "../../entities/User";
import {Model} from "mongoose";
import {UserModel} from "./MongoDbUser";

export class MongoDbUserRepository extends MongoDbBaseRepository<User> {
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
}