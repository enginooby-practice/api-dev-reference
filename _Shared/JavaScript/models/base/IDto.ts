import {IModel} from "./IModel";

export interface IDto<T extends IModel> {
}


// *** CRUD DTO ***//

export interface ICreateDto<T extends IModel> extends IDto<T> {
}

export interface IGetDto<T extends IModel> extends IDto<T> {
}

export interface IUpdateDto<T extends IModel> extends IDto<T> {
}

// don't need IDeleteDto as we only pass id for removal operation


// *** CUSTOM DTO ***//

export interface IFilterDto<T extends IModel> extends IDto<T> {
}

export interface ISortDto<T extends IModel> extends IDto<T> {
}

export enum SortOrder {
    Esc = 1,
    Desc = -1
}

/**
 * API paginating, retrieval operation, universal (for all model types).
 */
export interface IPaginator {
    limit?: number,
    page?: number
}
