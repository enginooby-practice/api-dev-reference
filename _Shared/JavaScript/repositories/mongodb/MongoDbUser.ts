import {model, Schema} from "mongoose";
import {User} from "../../models/User";
import {Task} from "../../models/Task";

const userSchema = new Schema<User>({
        id: {type: String, required: false, unique: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        tokens: [String]
    },
    {
        timestamps: true,
    }
);

// TODO: Setup TS typing for schema virtual property, methods & statics
userSchema.virtual("tasks", {
    ref: Task.name,
    localField: "_id",
    foreignField: "ownerId"
});

userSchema.methods.toDto = function (): User {
    const user = this;
    const userDto = new User(
        user.id,
        user.username,
        user.password,
        user.email,
        user.tokens
    );

    return userDto;
}

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await UserModel.findOne({email, password});

    if (!user) {
        throw new Error("Unable to login.");
    }

    return user;
}

export const UserModel = model<User>(User.name, userSchema)