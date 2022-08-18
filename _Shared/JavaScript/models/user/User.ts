import {IModel} from "../base/IModel";

export class User implements IModel {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public email: string,
        public tokens?: string[] // multiple tokens to allow sign in/up from multiple devices
    ) {
    }

    /**
     * Hide sensitive data when sending responses (IGetDto)
     * This is a special JS method that is implicitly invoked when passing response: res.send(user)
     */
    toJSON() {
        return {
            username: this.username,
            email: this.email,
        }
    }
}