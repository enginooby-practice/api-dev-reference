import {BaseRepository} from "./BaseRepository";
import fs from "fs";
import {IEntity} from "../entities/IEntity";

/**
 * Fake data from text file or variable, can be used for testing.
 */
export class MockBaseRepository<T extends IEntity> extends BaseRepository<T> {
    protected readonly _entities: Array<T> = [];

    constructor(jsonPath: string) {
        super();

        const dataJson = fs.readFileSync(jsonPath, 'utf-8');
        const data: Array<any> = JSON.parse(dataJson);

        data.forEach(entityObj => {
                // console.log(entityObj)
                this._entities.push(entityObj);
            }
        )
    }

    create(entity: T): Promise<boolean> {
        return Promise.resolve(false);
    }

    find(entity: T): Promise<T[]> {
        return Promise.resolve([]);
    }

    findById(id: string): Promise<T> {
        return Promise.resolve(this._entities.find(e => e.id == id));
    }

    getAll(): Promise<T[]> {
        return Promise.resolve(this._entities);
    }

    update(id: string, entity: T): Promise<boolean> {
        return Promise.resolve(false);
    }

    async delete(id: string): Promise<boolean> {
        const entity = await this.findById(id);

        for (let i = 0; i < this._entities.length; i++) {
            if (this._entities[i] === entity) {
                this._entities.splice(i, 1);
                return Promise.resolve(true);
            }
        }

        return Promise.reject(new Error("Entity not found."));
    }
}