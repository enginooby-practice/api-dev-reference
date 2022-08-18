import {IModel} from "../../models/base/IModel";
import {ICrudable} from "./ICrudable";

/**
 * Manage operations for a database table (entity).
 */
export abstract class CrudRepository<T extends IModel> implements ICrudable<T> {
    abstract create(entity: T): Promise<T>;

    abstract getAll(): Promise<T[]>;

    abstract getById(id: string): Promise<T>;

    abstract update(id: string, entity: T): Promise<boolean>;

    save = async (entity: T): Promise<boolean> => await this.update(entity.id, entity);

    abstract delete(id: string): Promise<boolean>;

    abstract deleteAll(): Promise<boolean>;
}