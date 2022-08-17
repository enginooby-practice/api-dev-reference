import {IEntity} from "../../models/IEntity";
import {CrudRepository} from "../base/CrudRepository";
import {MongoDbDriver} from "./MongoDbDriver";
import {Collection, Db} from 'mongodb';
import {Model} from "mongoose"

export abstract class MongoDbBaseRepository<T extends IEntity> extends CrudRepository<T> {
    protected entities: Collection;

    protected abstract model(): Model<any>;

    constructor() {
        super();

        MongoDbDriver.connect().then(() => {
        });
    }

    abstract create(entity: T): Promise<T>;

    async delete(id: string): Promise<boolean> {
        const result = await this.model().deleteOne({id: id});

        if (result.deletedCount > 0) {
            return Promise.resolve(true);
        }

        return Promise.reject(new Error('Failed to delete entity.'));
    }

    async deleteAll(): Promise<boolean> {
        await this.model().deleteMany();

        return Promise.resolve(true);
    }

    async findById(id: string): Promise<T> {
        const document = await this.model().findOne({id});

        if (document) {
            const entity = document.toObject() as T;
            return Promise.resolve(entity);
        }

        return Promise.resolve(null);
    }

    async getAll(): Promise<T[]> {
        const entities: T[] = [];
        const documents = await this.model().find({});

        documents.forEach(e => {
            entities.push(e.toObject() as T);
        })

        return Promise.resolve(entities);
    }

    async update(id: string, entity: T): Promise<boolean> {
        await this.model().findOneAndUpdate({id}, entity);

        return Promise.resolve(true);
    }
}