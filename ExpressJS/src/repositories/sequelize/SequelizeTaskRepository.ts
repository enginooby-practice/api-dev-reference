import {SequelizeBaseRepository} from "./SequelizeBaseRepository";
import {Task} from "../../entities/Task";
import {ITaskRepository} from "../base/ITaskRepository";
import {User} from "../../entities/User";
import {Model, ModelCtor} from "sequelize/types";
import {defineSequelizeTask, SequelizeTask} from "./SequelizeTask";
import {userRepository} from "../repositoryManager";

export class SequelizeTaskRepository extends SequelizeBaseRepository<Task> implements ITaskRepository {
    protected getSequelize(): ModelCtor<Model<any, any>> {
        defineSequelizeTask();
        return SequelizeTask;
    }

    async findByTitle(title: string): Promise<Task[]> {
        const tasks: Task[] = [];

        const tasksInRepo = await SequelizeTask.findAll({
            where: {
                title
            }
        })

        for (let task of tasksInRepo) {
            tasks.push(task as unknown as Task);
        }

        return Promise.resolve(tasks);
    }

    async getUserById(id: string): Promise<User> {
        const task = await this.findById(id);
        const user = await userRepository.findById(task.ownerId);

        return Promise.resolve(user);
    }
}