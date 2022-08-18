import {IDto} from "../base/IDto";
import {User} from "./User";
import {IsEmail, IsNotEmpty, IsString, Matches} from "class-validator";

export class UserCredentialsDto implements IDto<User> {
    @IsNotEmpty()
    @IsString()
    public password: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string
}