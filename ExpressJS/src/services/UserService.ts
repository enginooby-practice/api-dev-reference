import {userRepository} from "../repositories/repositoryManager";
import {User} from "../entities/User";
import jwt from "jsonwebtoken";

class UserService {
    async delete(id: string): Promise<boolean> {
        return userRepository.delete(id);
    }

    async update(id: string, content: any): Promise<boolean> {
        const updatingKeys = Object.keys(content);
        const mutableKeys = ["username", "password"];
        const canUpdate = updatingKeys.every(key => mutableKeys.includes(key));

        if (canUpdate) {
            return userRepository.update(id, content); // FIX: not saved
        }

        throw Error("Invalid updating request (tried updating immutable/non-existing keys).");
    }

    async signUp(user: User) {
        const newUser = await userRepository.create(user);
        const token = await this.generateAuthToken(newUser);
        ;

        return {newUser, token};
    }

    async signIn(email: string, password: string): Promise<User> {
        const user = await userRepository.findByCredentials(email, password);
        await this.generateAuthToken(user);
        await userRepository.save(user);

        return user;
    }

    async signOut(currentUser: User, currentToken: string) {
        currentUser.tokens = currentUser.tokens.filter(token => token != currentToken);
        await userRepository.save(currentUser);

        return {"message": "Logged out"};
    }

    async signOutAll(currentUser: User, currentToken: string) {
        currentUser.tokens = [];
        await userRepository.save(currentUser);

        return {"message": "Logged out all"};
    }

    private async generateAuthToken(user: User): Promise<string> {
        const token = jwt.sign({id: user.id}, "enginooby");
        user.tokens.push(token);
        return Promise.resolve(token);
    }

    async authenticate(token: string): Promise<User> {
        const decoded = jwt.verify(token, "enginooby") as jwt.JwtPayload; // MAGIC
        const user = await userRepository.findById(decoded.id);

        if (!user || !user.tokens.includes(token)) {
            return Promise.resolve(user);
        }

        return Promise.reject(undefined);
    }
}

export const userService = new UserService();