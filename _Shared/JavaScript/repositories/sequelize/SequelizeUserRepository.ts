import {SequelizeBaseRepository} from "./SequelizeBaseRepository";
import {User} from "../../models/User";
import {IUserRepository} from "../base/IUserRepository";
import {ITaskSorter, Task} from "../../models/Task";
import {IPaginator} from "../../models/IPaginator";
import {defineSequelizeUser, SequelizeUser} from "./SequelizeUser";
import {Model, ModelCtor} from "sequelize/types";
import {defineSequelizeTask, SequelizeTask} from "./SequelizeTask";

export class SequelizeUserRepository extends SequelizeBaseRepository<User> implements IUserRepository {
    protected getSequelize(): ModelCtor<Model<any, any>> {
        defineSequelizeUser();
        return SequelizeUser;
    }

    async findByCredentials(email: string, password: string): Promise<User> {
        const user = await this.getSequelize().findOne({
            where: {
                email, password
            }
        })

        return Promise.resolve(user as unknown as User);
    }

    // TODO: filter, paginator, sorter
    async getTasksById(id: string, filter?: Partial<Task>, paginator?: IPaginator, sorter?: ITaskSorter): Promise<Task[]> {
        const tasks: Task[] = [];
        const tasksInRepo = await SequelizeTask.findAll({
            where: {
                ownerId: parseInt(id)
            }
        })

        for (let task of tasksInRepo) {
            tasks.push(task as unknown as Task);
        }

        return Promise.resolve(tasks);
    }
}