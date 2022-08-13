import {model, Schema} from "mongoose";
import {User} from "../../entities/User";

const userSchema = new Schema<User>({
    id: {type: String, required: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    tokens: [String]
})


// TODO: Setup TS typing for schema methods & statics
userSchema.methods.toDto = function (): User {
    const user = this;
    const userDto = new User();
    userDto.id = user.id;
    userDto.username = user.username;
    userDto.password = user.password;
    userDto.email = user.email;
    userDto.tokens = user.tokens;

    return userDto;
}

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await UserModel.findOne({email, password});

    if (!user) {
        throw new Error("Unable to login.");
    }

    return user;
}

export const UserModel = model<User>('User', userSchema)