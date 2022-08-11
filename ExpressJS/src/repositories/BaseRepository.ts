import {IWritable} from "./IWritable";
import {IReadable} from "./IReadable";

/**
 * Manage operations for a database table (entity).
 */
export abstract class BaseRepository<T> implements IWritable<T>, IReadable<T> {
    abstract create(entity: T): Promise<boolean>;

    abstract delete(id: string): Promise<boolean>;

    abstract find(entity: T): Promise<T[]>;

    abstract findById(id: string): Promise<T>;

    abstract update(id: string, entity: T): Promise<boolean>;

    abstract getAll(): Promise<T[]>;
}