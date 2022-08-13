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

    async findByCredentials(email: string, password: string): Promise<User> {
        // @ts-ignore
        const user = await this.model().findByCredentials(email, password);

        if (user) {
            // return Promise.resolve(user.toObject() as User); // this not work if User class has methods
            return Promise.resolve(user.toDto());
        }
        // return Promise.resolve(undefined);
    }
}