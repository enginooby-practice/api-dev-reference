import {CrudRepository} from "../../base/CrudRepository";
import fs from "fs";
import {IEntity} from "../../../entities/IEntity";

/**
 * Fake data from text file or in-memory variable, can be used for testing.
 */
export class MockBaseRepository<T extends IEntity> extends CrudRepository<T> {
    protected readonly entities: Array<T> = [];

    constructor(jsonPath: string) {
        super();

        const dataJson = fs.readFileSync(jsonPath, 'utf-8');
        const data: Array<any> = JSON.parse(dataJson);

        data.forEach(entityObj => {
                // console.log(entityObj)
                this.entities.push(entityObj);
            }
        )
    }

    async create(entity: T): Promise<boolean> {
        this.entities.push(entity);
        return Promise.resolve(true);
    }

    find(entity: T): Promise<T[]> {
        return Promise.resolve([]);
    }

    findById(id: string): Promise<T> {
        return Promise.resolve(this.entities.find(e => e.id == id));
    }

    getAll(): Promise<T[]> {
        return Promise.resolve(this.entities);
    }

    async update(id: string, entity: T): Promise<boolean> {
        let oldEntity = await this.findById(id);

        if (oldEntity) {
            let index = this.entities.indexOf(oldEntity);
            this.entities[index] = entity;

            return Promise.resolve(true);
        } else {
            return Promise.reject(new Error("Entity not found."));
        }
    }

    async delete(id: string): Promise<boolean> {
        const entity = await this.findById(id);

        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] === entity) {
                this.entities.splice(i, 1);
                return Promise.resolve(true);
            }
        }

        return Promise.reject(new Error("Entity not found."));
    }
}