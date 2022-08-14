// REFACTOR: duplicated try-catch
import {NextFunction, Request, Response} from "express";
import {userRepository} from "../repositories/repositoryManager";
import {User} from "../entities/User";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(req.currentUser);
    } catch (e) {
        next(e);
    }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await userRepository.delete(req.currentUser.id))
    } catch (e) {
        next(e);
    }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatingKeys = Object.keys(req.body);
        const isRequestValid = updatingKeys.every(key => User.getMutableKeys().includes(key));

        if (isRequestValid) {
            const succeed = await userRepository.update(req.currentUser.id, req.body);
            return res.status(200).json({"updated": succeed});
        }

        throw new Error("Invalid updating request (tried updating immutable/non-existing keys).");
    } catch (e) {
        next(e);
    }
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await userRepository.create(req.body);
        const token = await newUser.generateAuthToken();

        return res.status(201).json({newUser, token});
    } catch (e) {
        e.status = 400;
        next(e);
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.findByCredentials(req.body.email, req.body.password);
        await user.generateAuthToken();
        await userRepository.save(user);

        res.send(user);
    } catch (e) {
        next(e);
    }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.currentUser.tokens = req.currentUser.tokens.filter(token => token != req.currentToken);
        await userRepository.save(req.currentUser);

        res.send({"message": "Logged out"});
    } catch (e) {
        next(e);
    }
}

export const signOutAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.currentUser.tokens = [];
        await userRepository.save(req.currentUser);

        res.send({"message": "Logged all out"});
    } catch (e) {
        next(e);
    }
}