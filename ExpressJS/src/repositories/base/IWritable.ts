import {IEntity} from "../../entities/IEntity";

export interface IWritable<T extends IEntity> {
    create(entity: T): Promise<boolean>;

    update(id: string, entity: T): Promise<boolean>;

    delete(id: string): Promise<boolean>;
}