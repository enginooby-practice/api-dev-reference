import {IEntity} from "./IEntity";
import jwt from "jsonwebtoken"; // DECOUPLE

export class User implements IEntity {
    id: string;
    username: string;
    password: string;
    email: string;
    tokens: string[]; // multiple tokens to allow sign in/up from multiple devices

    /**
     * List of fields that can be changed via APIs.
     */
    static getMutableKeys(): string[] {
        return ["username", "password"];
    }

    async generateAuthToken(): Promise<string> {
        const token = jwt.sign({id: this.id}, "enginooby");
        this.tokens.push(token);
        return Promise.resolve(token);
    }

    /**
     * Hide sensitive data when sending responses.
     * This is a special JS method that is implicitly invoked when passing response: res.send(user)
     */
    toJSON() {
        return {
            username: this.username,
            email: this.email,
        }
    }
}