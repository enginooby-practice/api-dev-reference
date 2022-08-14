import {IEntity} from "../../entities/IEntity";

export interface IWritable<T extends IEntity> {
    create(entity: T): Promise<T>;

    // TODO: Return Promise<T>
    update(id: string, entity: T): Promise<boolean>;

    save(entity: T): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}