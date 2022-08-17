import {IEntity} from "../../models/IEntity";
import {CrudRepository} from "../base/CrudRepository";
import {TypeOrmDriver} from "./TypeOrmDriver";
import {Repository} from "typeorm";

export abstract class TypeOrmBaseRepository<T extends IEntity> extends CrudRepository<T> {
    protected abstract getTypeOrmRepository(): Repository<any>

    constructor() {
        super();

        TypeOrmDriver.connect().then(() => {
            setTimeout(() => {
                // testing code
            }, 1000) // set delay to wait for Entity metadata to be found
        });
    }

    async delete(id: string): Promise<boolean> {
        const repoEntity = await this.findById(id);

        if (!repoEntity) return Promise.reject(new Error("Entity not found."));

        await this.getTypeOrmRepository().remove(repoEntity);

        return Promise.resolve(true);
    }

    async deleteAll(): Promise<boolean> {
        await this.getTypeOrmRepository().clear();

        return Promise.resolve(true);
    }

    async create(entity: T): Promise<T> {
        // @ts-ignore
        // const entityModel: TypeOrmUser = new TypeOrmUser(entity.id, entity.username, entity.password, entity.email, entity.tokens);
        // const result = await this.getTypeOrmRepository().save(entityModel);
        //
        // return Promise.resolve(result);

        return Promise.resolve(null);
    }

    async findById(id: string): Promise<T> {
        const entityInRepo = await this.getTypeOrmRepository().findOneBy({id});

        return Promise.resolve(entityInRepo as T);
    }

    async getAll(): Promise<T[]> {
        const entitiesInRepo = await this.getTypeOrmRepository().find();
        const entities: T[] = [];

        entitiesInRepo.forEach(e => entities.push(e as T));

        return Promise.resolve(entities);
    }

    async update(id: string, entity: T): Promise<boolean> {
        const repoEntity = await this.findById(id);

        // TODO: copy selected non-null properties (maybe using UpdateDTO) from passed entity to entityToUpdate
        await this.getTypeOrmRepository().save(repoEntity);

        return Promise.resolve(true);
    }
}