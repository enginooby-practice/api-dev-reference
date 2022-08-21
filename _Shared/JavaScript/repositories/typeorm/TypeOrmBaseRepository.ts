import {IModel} from "../../models/base/IModel";
import {CrudRepository} from "../base/CrudRepository";
import {TypeOrmDriver} from "./TypeOrmDriver";
import {Repository} from "typeorm";
import {IUpdateDto} from "../../models/base/IDto";

export abstract class TypeOrmBaseRepository<T extends IModel> extends CrudRepository<T> {
    public abstract getTypeOrmRepository(): Repository<any>;

    constructor() {
        super();

        TypeOrmDriver.connect().then(() => {
            setTimeout(() => {
                // testing code
            }, 1000) // set delay to wait for Entity metadata to be found
        });
    }

    async delete(id: string): Promise<boolean> {
        const repoEntity = await this.getById(id);

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

    async getById(id: string): Promise<T> {
        const repoEntity = await this.getTypeOrmRepository().findOneBy({id});

        return Promise.resolve(repoEntity as T);
    }

    async getAll(): Promise<T[]> {
        // FIX: "this" is undefined in MarbleJS
        // temp - define override method in TypeOrmTaskRepository
        const repoEntities = await this.getTypeOrmRepository().find();
        const entities: T[] = [];

        repoEntities.forEach(e => entities.push(e as T));

        return Promise.resolve(entities);
    }

    async update(id: string, dto: IUpdateDto<T>): Promise<boolean> {
        const repoEntity = await this.getById(id);

        repoEntity.applyUpdate(dto);
        await this.getTypeOrmRepository().save(repoEntity);

        return Promise.resolve(true);
    }
}