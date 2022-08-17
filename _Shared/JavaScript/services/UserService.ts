import {taskRepository, userRepository} from "../repositories/repositoryManager";
import {User} from "../models/User";
import jwt from "jsonwebtoken";// ? Make an AuthService wrapper if use different auth strategies

class UserService {
    async delete(id: string): Promise<boolean> {
        const tasks = await userRepository.getTasksById(id);
        tasks.forEach(task => taskRepository.delete(task.id));

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

    // TODO: Hash password
    async signUp(user: User) {
        const newUser = await userRepository.create(user);
        const token = await this.generateAuthToken(newUser);
        await userRepository.save(newUser);

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

        return {message: "Logged out"};
    }

    async signOutAll(currentUser: User) {
        currentUser.tokens = [];
        await userRepository.save(currentUser);

        return {message: "Logged out all"};
    }

    async generateAuthToken(user: User): Promise<string> {
        // ? Using process variable causes NodeJS coupling
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);

        const tokens: string[] = user.tokens ?? [];
        tokens.push(token);
        user.tokens = tokens;
        // user.tokens.push(token);

        return Promise.resolve(token);
    }

    async authenticate(token: string): Promise<User> {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as jwt.JwtPayload;
        const user = await userRepository.findById(decoded.id);

        if (!user || !user.tokens.includes(token)) {
            return Promise.reject(new Error("Invalid token"));
        }

        return Promise.resolve(user);
    }
}

export const userService = new UserService();