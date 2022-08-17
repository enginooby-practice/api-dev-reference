import fs from "fs";
import {IEntity} from "../../models/IEntity";
import {CrudRepository} from "../base/CrudRepository";

/**
 * Fake data from text file or in-memory database, used for testing.
 */
export class MockBaseRepository<T extends IEntity> extends CrudRepository<T> {
    protected readonly entities: Array<T> = [];

    constructor(jsonPath: string) {
        super();

        const dataJson = fs.readFileSync(jsonPath, 'utf-8');
        const data: Array<any> = JSON.parse(dataJson);
        data.forEach(entityObj => this.entities.push(entityObj));
    }

    async create(entity: T): Promise<T> {
        this.entities.push(entity);
        return Promise.resolve(entity);
    }

    async findById(id: string): Promise<T> {
        return Promise.resolve(this.entities.find(e => e.id == id));
    }

    async getAll(): Promise<T[]> {
        return Promise.resolve(this.entities);
    }

    async update(id: string, entity: T): Promise<boolean> {
        let oldEntity = await this.findById(id);

        if (oldEntity) {
            // keep keys that new entity missing from the old entity
            const properties = Object.keys(oldEntity);
            properties.forEach(prop => entity[prop] ??= oldEntity[prop])

            const index = this.entities.indexOf(oldEntity);
            this.entities[index] = entity;

            return Promise.resolve(true);
        }

        return Promise.reject(new Error("Entity not found."));
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

    async deleteAll(): Promise<boolean> {
        this.entities.length = 0;

        return Promise.resolve(true);
    }
}