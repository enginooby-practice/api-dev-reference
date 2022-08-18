// Using some databases like MongoDb, we can also define database model (entity) with validation.
// Create an independent DTO with validation like this to apply validation to any database,
import {ICreateDto} from "../base/IDto";
import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {User} from "./User";

// REFACTOR: duplicated validation code in different DTO types
export class UserCreateDto implements ICreateDto<User> {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    public username: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsNotEmpty()
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Password must contain at least 1 upper, lower, number, special characters."
    })
    public password: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string
}