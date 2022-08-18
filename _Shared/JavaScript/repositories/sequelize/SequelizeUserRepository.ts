import {SequelizeBaseRepository} from "./SequelizeBaseRepository";
import {User} from "../../models/user/User";
import {IUserRepository} from "../base/IUserRepository";
import {Task} from "../../models/task/Task";
import {IPaginator} from "../../models/base/IDto";
import {defineSequelizeUser, SequelizeUser} from "./SequelizeUser";
import {Model, ModelCtor} from "sequelize/types";
import {SequelizeTask} from "./SequelizeTask";
import {TaskSortDto} from "../../models/task/TaskSortDto";

export class SequelizeUserRepository extends SequelizeBaseRepository<User> implements IUserRepository {
    protected getSequelize(): ModelCtor<Model<any, any>> {
        defineSequelizeUser();
        return SequelizeUser;
    }

    async getByCredentials(email: string, password: string): Promise<User> {
        const user = await this.getSequelize().findOne({
            where: {
                email, password
            }
        })

        return Promise.resolve(user as unknown as User);
    }

    // TODO: filter, paginator, sorter
    async getTasksOf(id: string, filter?: Partial<Task>, paginator?: IPaginator, sorter?: TaskSortDto): Promise<Task[]> {
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