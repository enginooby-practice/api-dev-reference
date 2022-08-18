import {IModel} from "../../models/base/IModel";
import {IFilterDto, IGetDto, IPaginator, ISortDto} from "../../models/base/IDto";

export interface IReadable<T extends IModel> {
    // in many cases, we can just use Partial type for filter w/o creating new Filter DTO type
    // ? define type IFilter: union of IFilterDto<T> & Partial<T>
    getAll(filter?: IFilterDto<T> | Partial<T>, sorter?: ISortDto<T>, paginator?: IPaginator): Promise<T[] | IGetDto<T>[]>;

    getById(id: string): Promise<T | IGetDto<T>>;
}