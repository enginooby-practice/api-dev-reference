import {User} from "../../models/user/User";
import {Task} from "../../models/task/Task";
import {IUserRepository} from "../base/IUserRepository";
import {IPaginator} from "../../models/base/IDto";
import {TypeOrmBaseRepository} from "./TypeOrmBaseRepository";
import {TypeOrmDriver} from "./TypeOrmDriver";
import {TypeOrmUser} from "./TypeOrmUser";
import {Repository} from "typeorm";
import {TaskSortDto} from "../../models/task/TaskSortDto";

export class TypeOrmUserRepository extends TypeOrmBaseRepository<User> implements IUserRepository {
    public getTypeOrmRepository(): Repository<any> {
        return TypeOrmDriver.dataSource.getRepository(TypeOrmUser);
    }

    async getByCredentials(email: string, password: string): Promise<User> {
        const repoEntity = await this.getTypeOrmRepository().findOneBy({email, password});

        if (repoEntity) {
            return Promise.resolve(repoEntity);
        }

        return Promise.reject(new Error("Entity not found."));
    }

    getTasksOf(id: string, filter?: Partial<Task>, paginator?: IPaginator, sorter?: TaskSortDto): Promise<Task[]> {
        return Promise.resolve([]);
    }

    // REFACTOR: duplicated code in User & Task repos
    async create(entity: User): Promise<User> {
        const userEntity: TypeOrmUser = new TypeOrmUser(entity.id, entity.username, entity.password, entity.email, entity.tokens);
        const result = await TypeOrmDriver.dataSource.manager.save(userEntity);

        return Promise.resolve(result);
    }
}