import {BaseRepository} from "./BaseRepository";
import fs from "fs";

/**
 * Fake data from text file or variable, can be used for testing.
 */
export abstract class MockBaseRepository<T> extends BaseRepository<T> {
    protected readonly _entities: Array<T> = [];

    constructor(jsonPath: string) {
        super();

        const dataJson = fs.readFileSync(jsonPath, 'utf-8');
        let data = []; // for intellisense to display array methods

        // REFACTOR
        data = JSON.parse(dataJson);
        data.forEach(entityObj => {
                // console.log(entityObj)
                this._entities.push(entityObj);
            }
        )
    }
}