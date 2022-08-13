import {MockBaseRepository} from "./MockBaseRepository";
import {User} from "../../entities/User";
import {IUserRepository} from "../base/IUserRepository";

export class MockUserRepository extends MockBaseRepository<User> implements IUserRepository {
    findByCredentials(email: string, password: string): Promise<User> {
        return Promise.resolve(undefined);
    }
}