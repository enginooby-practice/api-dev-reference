import {Task} from "../../models/task/Task";
import {User} from "../../models/user/User";
import {SequelizeBaseRepository} from "./SequelizeBaseRepository";
import {ITaskRepository} from "../base/ITaskRepository";
import {Model, ModelCtor} from "sequelize/types";
import {defineSequelizeTask, SequelizeTask} from "./SequelizeTask";
import {userRepository} from "../repositoryManager";
import {IGetDto} from "../../models/base/IDto";

export class SequelizeTaskRepository extends SequelizeBaseRepository<Task> implements ITaskRepository {
    protected getSequelize(): ModelCtor<Model<any, any>> {
        defineSequelizeTask();
        return SequelizeTask;
    }

    async getByTitle(title: string): Promise<Task[]> {
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

    // REFACTOR: Duplicated code
    async getUserOf(id: string): Promise<User | IGetDto<User>> {
        const task = await this.getById(id);
        const user = await userRepository.getById(task.ownerId);

        return Promise.resolve(user);
    }
}