import {IModel} from "../../models/base/IModel";
import {ICreateDto, IUpdateDto} from "../../models/base/IDto";

export interface IWritable<T extends IModel> {
    create(createDto: ICreateDto<T> | T): Promise<T>;

    // TODO: Return Promise<T>
    update(id: string, updateDto: IUpdateDto<T> | T): Promise<boolean>;

    /**
     * Update using business model which already includes id.
     */
    save(entity: T): Promise<boolean>;

    delete(id: string): Promise<boolean>;

    deleteAll(): Promise<boolean>;
}