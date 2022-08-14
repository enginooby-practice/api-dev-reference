import {IEntity} from "./IEntity";

export class User implements IEntity {
    id: string;
    username: string;
    password: string;
    email: string;
    tokens: string[]; // multiple tokens to allow sign in/up from multiple devices

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