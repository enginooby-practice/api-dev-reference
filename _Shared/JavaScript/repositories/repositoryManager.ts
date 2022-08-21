// ? DECOUPLE: let each repo type to init User & Task repos by itself depending on exported REPOSITORY value
import * as path from "path";
import {ITaskRepository} from "./base/ITaskRepository";
import {IUserRepository} from "./base/IUserRepository";
import {JsonTaskRepository} from "./json/JsonTaskRepository";
import {JsonUserRepository} from "./json/JsonUserRepository";
import {MongoDbTaskRepository} from "./mongodb/MongoDbTaskRepository";
import {MongoDbUserRepository} from "./mongodb/MongoDbUserRepository";
import {SequelizeTaskRepository} from "./sequelize/SequelizeTaskRepository";
import {SequelizeUserRepository} from "./sequelize/SequelizeUserRepository";
import {FirebaseTaskRepository} from "./firebase/FirebaseTaskRepository";
import {FirebaseUserRepository} from "./firebase/FirebaseUserRepository";
import {TypeOrmTaskRepository} from "./typeorm/TypeOrmTaskRepository";
import {TypeOrmUserRepository} from "./typeorm/TypeOrmUserRepository";

export enum RepositoryType {Json, MongoDb, Sequelize, Firebase, TypeOrm}

const REPOSITORY: RepositoryType = RepositoryType.MongoDb;

export let taskRepository: ITaskRepository;
export let userRepository: IUserRepository;

function InitializeRepositories() {
    switch (REPOSITORY) {
        case RepositoryType.Json:
            // TODO: Get from root folder
            taskRepository = new JsonTaskRepository(path.join(__dirname, "../../_Shared/tasks.json"));
            userRepository = new JsonUserRepository(path.join(__dirname, "../../_Shared/users.json"));
            break;
        case RepositoryType.MongoDb:
            taskRepository = new MongoDbTaskRepository();
            userRepository = new MongoDbUserRepository();
            break;
        case RepositoryType.Sequelize:
            taskRepository = new SequelizeTaskRepository();
            userRepository = new SequelizeUserRepository();
            break;
        case RepositoryType.Firebase:
            taskRepository = new FirebaseTaskRepository("tasks");
            userRepository = new FirebaseUserRepository("users");
            break;
        case RepositoryType.TypeOrm:
            taskRepository = new TypeOrmTaskRepository();
            userRepository = new TypeOrmUserRepository();
            break;
        default:
            break;
    }
}

InitializeRepositories();