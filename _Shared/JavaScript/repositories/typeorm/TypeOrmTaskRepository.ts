import {Task} from "../../models/task/Task";
import {User} from "../../models/user/User";
import {ITaskRepository} from "../base/ITaskRepository";
import {TypeOrmBaseRepository} from "./TypeOrmBaseRepository";
import {TypeOrmDriver} from "./TypeOrmDriver";
import {TypeOrmTask} from "./TypeOrmTask";
import {Repository} from "typeorm";

export class TypeOrmTaskRepository extends TypeOrmBaseRepository<Task> implements ITaskRepository {
    protected getTypeOrmRepository(): Repository<any> {
        return TypeOrmDriver.dataSource.getRepository(TypeOrmTask);
    }

    async getByTitle(title: string): Promise<Task[]> {
        const repoEntities = await this.getTypeOrmRepository().findBy({title});
        const entities: Task[] = [];

        repoEntities.forEach(e => entities.push(e));

        return Promise.resolve(repoEntities);
    }

    getUserOf(id: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    async create(entity: Task): Promise<Task> {
        const entityModel: TypeOrmTask = new TypeOrmTask();
        entityModel.id = entity.id;
        entityModel.title = entity.title;
        entityModel.status = entity.status;
        entityModel.isArchived = entity.isArchived;
        entityModel.priority = entity.priority;
        entityModel.ownerId = entity.ownerId;

        const result = await TypeOrmDriver.dataSource.manager.save(entityModel as TypeOrmTask);

        return Promise.resolve(result);
    }
}