import {IUpdateDto} from "./IDto";

export interface IModel {
    id: string;

    applyUpdate(dto: IUpdateDto<IModel>): void;
}