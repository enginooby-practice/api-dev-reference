import {userRepository} from "../repositories/repositoryManager";
import {User} from "../entities/User";

class UserService {
    async delete(id: string): Promise<boolean> {
        return userRepository.delete(id);
    }

    async update(id: string, content: any): Promise<boolean> {
        const updatingKeys = Object.keys(content);
        const mutableKeys = ["username", "password"];
        const isRequestValid = updatingKeys.every(key => mutableKeys.includes(key));

        if (isRequestValid) {
            return userRepository.update(id, content); // FIX: not saved
        }

        throw Error("Invalid updating request (tried updating immutable/non-existing keys).");
    }

    async signUp(user: User) {
        const newUser = await userRepository.create(user);
        const token = await newUser.generateAuthToken();

        return {newUser, token};
    }

    async signIn(email: string, password: string): Promise<User> {
        const user = await userRepository.findByCredentials(email, password);
        await user.generateAuthToken();
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
}

export const userService = new UserService();