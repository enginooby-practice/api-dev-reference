import {IEntity} from "../../models/IEntity";

export interface IReadable<T extends IEntity> {
    getAll(): Promise<T[]>;

    findById(id: string): Promise<T>;
}