import * as path from "path";
import {ITaskRepository} from "../repositories/base/ITaskRepository";
import {IUserRepository} from "../repositories/base/IUserRepository";
import {MockTaskRepository} from "../repositories/mock/MockTaskRepository";
import {MockUserRepository} from "../repositories/mock/MockUserRepository";
import {MongoDbTaskRepository} from "../repositories/mongodb/MongoDbTaskRepository";
import {MongoDbUserRepository} from "../repositories/mongodb/MongoDbUserRepository";

enum RepositoryType {Mock, MongoDb}

const REPOSITORY: RepositoryType = RepositoryType.MongoDb;

export let taskRepository: ITaskRepository;
export let userRepository: IUserRepository;

function InitializeRepositories() {
    switch (REPOSITORY) {
        case RepositoryType.Mock:
            // TODO: Get from root folder
            taskRepository = new MockTaskRepository(path.join(__dirname, "../../_Shared/tasks.json"));
            userRepository = new MockUserRepository(path.join(__dirname, "../../_Shared/users.json"));
            break;
        case RepositoryType.MongoDb:
            taskRepository = new MongoDbTaskRepository();
            userRepository = new MongoDbUserRepository();
            break;
        default:
            break;
    }
}

InitializeRepositories();