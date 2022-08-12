import {MongoDbBaseRepository} from "./MongoDbBaseRepository";
import {User} from "../../entities/User";
import {Model} from "mongoose";
import {UserModel} from "./MongoDbUser";

export class MongoDbUserRepository extends MongoDbBaseRepository<User> {
    protected model(): Model<any> {
        return UserModel;
    }
}