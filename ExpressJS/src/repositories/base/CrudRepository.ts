import {IWritable} from "./IWritable";
import {IReadable} from "./IReadable";
import {IEntity} from "../../entities/IEntity";

/**
 * Manage operations for a database table (entity).
 */
export abstract class CrudRepository<T extends IEntity> implements IWritable<T>, IReadable<T> {
    abstract create(entity: T): Promise<T>;

    abstract delete(id: string): Promise<boolean>;

    abstract findById(id: string): Promise<T>;

    abstract update(id: string, entity: T): Promise<boolean>;

    abstract getAll(): Promise<T[]>;

    async save(entity: T): Promise<boolean> {
        return this.update(entity.id, entity);
    }

    abstract deleteAll(): Promise<boolean>;
}