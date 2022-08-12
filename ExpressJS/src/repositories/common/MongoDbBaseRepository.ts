import {IEntity} from "../../entities/IEntity";
import {CrudRepository} from "../base/CrudRepository";
import {MongoClient, Db, Collection} from 'mongodb';
import {MongoDbDriver} from "./MongoDbDriver";
import {TaskModel} from "../task/mongodb/MongoDbTask";

export class MongoDbBaseRepository<T extends IEntity> extends CrudRepository<T> {
    protected entities: Collection;

    constructor(db?: Db, collectionName?: string) {
        super();

        if (db && collectionName) {
            // MongoDbDriver.connect().then(function connect(){
            //     this.entities = db.collection(collectionName);
            // });

            MongoDbDriver.connect().then(() => {
                this.entities = db.collection(collectionName);
            });
        } else {
            MongoDbDriver.connect();
        }
    }

    create(entity: T): Promise<boolean> {
        return Promise.resolve(false);
    }

    async delete(id: string): Promise<boolean> {
        const result = await TaskModel.deleteOne({id: id});

        if (result.deletedCount > 0) {
            return Promise.resolve(true);
        }

        return Promise.reject(new Error('Failed to delete entity.'));
    }

    find(entity: T): Promise<T[]> {
        return Promise.resolve([]);
    }

    async findById(id: string): Promise<T> {
        const document = await TaskModel.findOne({id: id});

        if (document) {
            const entity = document.toObject() as T;
            return Promise.resolve(entity);
        }

        return Promise.reject(new Error("Entity not found."));
    }

    async getAll(): Promise<T[]> {
        const documents = await TaskModel.find({});
        const entities: T[] = [];

        documents.forEach(e => {
            entities.push(e.toObject() as T);
        })

        return Promise.resolve(entities);
    }

    update(id: string, entity: T): Promise<boolean> {
        return Promise.resolve(false);
    }
}