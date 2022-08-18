// REFACTOR: find a TS utility type to reuse Task type instead of new interface
import {ISortDto, SortOrder} from "../base/IDto";
import {IsEnum, IsOptional} from "class-validator";
import {Task} from "./Task";

export class TaskSortDto implements ISortDto<Task> {
    @IsOptional()
    @IsEnum(SortOrder)
    title?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    status?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    timeCreated?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    isArchived?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    priority?: SortOrder;
}