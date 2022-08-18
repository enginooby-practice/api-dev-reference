import {IUpdateDto} from "../base/IDto";
import {User} from "./User";
import {IsArray, IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class UserUpdateDto implements IUpdateDto<User> {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    public username?: string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: "Password must contain at least 1 upper, lower, number, special characters."
    })
    public password?: string

    @IsString()
    @IsEmail()
    public email?: string

    @IsArray()
    public tokens?: string[]
}