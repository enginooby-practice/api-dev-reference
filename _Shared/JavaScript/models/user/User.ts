import {IModel} from "../base/IModel";
import {UserUpdateDto} from "./UserUpdateDto";

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

    applyUpdate(dto: UserUpdateDto): void {
        this.email = dto.email ?? this.email;
        this.username = dto.username ?? this.username;
        this.password = dto.password ?? this.password;
        this.tokens = dto.tokens ?? this.tokens;
    }
}