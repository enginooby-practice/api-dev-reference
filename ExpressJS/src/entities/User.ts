import {IEntity} from "./IEntity";
import jwt from "jsonwebtoken"; // DECOUPLE

export class User implements IEntity {
    id: string;
    username: string;
    password: string;
    email: string;
    tokens: string[];

    async generateAuthToken(): Promise<string> {
        const token = jwt.sign({id: this.id}, "enginooby");
        this.tokens.push(token);
        return Promise.resolve(token);
    }
}