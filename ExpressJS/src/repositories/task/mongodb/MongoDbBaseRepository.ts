import {IEntity} from "../../../entities/IEntity";
import {CrudRepository} from "../../base/CrudRepository";
import {MongoClient, Db, Collection} from 'mongodb';
import {MongoDbDriver} from "./MongoDbDriver";
import {TaskModel} from "./MongoDbTask";

export class MongoDbBaseRepository<T extends IEntity> extends CrudRepository<T> {
    protected entities: Collection;

    constructor(db?: Db, collectionName?: string) {
        super();

        if (db && collectionName) {
            // MongoDbDriver.connect().then(function connect(){
            //     this.entities = db.collection(collectionName);
            // });

            // MongoDbDriver.connect().then(() => {
            //     this.entities = db.collection(collectionName);
            // });
        } else {
            MongoDbDriver.connect();
        }
    }

    create(entity: T): Promise<boolean> {
        return Promise.resolve(false);
    }

    delete(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    find(entity: T): Promise<T[]> {
        return Promise.resolve([]);
    }

    findById(id: string): Promise<T> {
        return Promise.resolve(undefined);
    }

    async getAll(): Promise<T[]> {
        const documents = await TaskModel.find({});
        const entities: T[] = [];

        documents.forEach(e => {
            entities.push(e.toObject());
        })

        return Promise.resolve(entities);
    }

    update(id: string, entity: T): Promise<boolean> {
        return Promise.resolve(false);
    }

}