import {IUpdateDto} from "../base/IDto";
import {User} from "./User";
import {IsNotEmpty} from "class-validator";

export class UserUpdateDto implements IUpdateDto<User> {
    public username?: string
    public password?: string
    public email?: string
    public tokens?: string[]
}