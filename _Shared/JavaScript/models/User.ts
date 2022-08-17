import {IEntity} from "./IEntity";
import {ICreateDto} from "./ICreateDto";
import {IsNotEmpty} from "class-validator";

export class User implements IEntity {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public email: string,
        public tokens?: string[] // multiple tokens to allow sign in/up from multiple devices
    ) {
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

// Using some databases like MongoDb, we can also define database model with validation.
// Create an independent DTO with validation like this to use with any database,
export class UserCreateDto implements ICreateDto {
    @IsNotEmpty()
    public username: string

    @IsNotEmpty()
    public password: string

    @IsNotEmpty()
    public email: string
}