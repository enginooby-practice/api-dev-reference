// Using some databases like MongoDb, we can also define database model (entity) with validation.
// Create an independent DTO with validation like this to apply validation to any database,
import {ICreateDto} from "../base/IDto";
import {IsNotEmpty} from "class-validator";
import {User} from "./User";

export class UserCreateDto implements ICreateDto<User> {
    @IsNotEmpty()
    public username: string

    @IsNotEmpty()
    public password: string

    @IsNotEmpty()
    public email: string
}