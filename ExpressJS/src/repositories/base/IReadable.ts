import {IEntity} from "../../entities/IEntity";

export interface IReadable<T extends IEntity> {
    getAll(): Promise<T[]>;

    find(entity: T): Promise<T[]>;

    findById(id: string): Promise<T>;
}