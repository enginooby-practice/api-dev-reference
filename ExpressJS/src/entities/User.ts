import {IEntity} from "./IEntity";

export class User implements IEntity {
    id: string;
    username: string;
    password: string;
    email: string;
}