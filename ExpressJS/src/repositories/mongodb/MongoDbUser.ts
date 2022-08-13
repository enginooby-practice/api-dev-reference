import {model, Schema} from "mongoose";
import {User} from "../../entities/User";

const userSchema = new Schema<User>({
    id: {type: String, required: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
})

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await UserModel.findOne({email, password});

    if (!user) {
        throw new Error("Unable to login.");
    }

    return user;
}

export const UserModel = model<User>('User', userSchema)