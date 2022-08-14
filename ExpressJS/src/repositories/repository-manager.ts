import * as path from "path";
import {ITaskRepository} from "./base/ITaskRepository";
import {IUserRepository} from "./base/IUserRepository";
import {MockTaskRepository} from "./mock/MockTaskRepository";
import {MockUserRepository} from "./mock/MockUserRepository";
import {MongoDbTaskRepository} from "./mongodb/MongoDbTaskRepository";
import {MongoDbUserRepository} from "./mongodb/MongoDbUserRepository";

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