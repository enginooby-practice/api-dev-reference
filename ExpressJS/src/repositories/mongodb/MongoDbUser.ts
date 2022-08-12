import {model, Schema} from "mongoose";
import {User} from "../../entities/User";

const userSchema = new Schema<User>({
    id: {type: String, required: false},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
})
 
export const UserModel = model<User>('User', userSchema)