// REFACTOR: duplicated try-catch
import {NextFunction, Request, Response} from "express";
import {userRepository} from "../repositories/repositoryManager";
import {User} from "../entities/User";
import {userService} from "../services/UserService";
import {taskService} from "../services/TaskService";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(req.currentUser);
    } catch (e) {
        next(e);
    }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await userService.delete(req.currentUser.id))
    } catch (e) {
        next(e);
    }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await userService.update(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(201).json(await userService.signUp(req.body));
    } catch (e) {
        next(e);
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await userService.signIn(req.body.email, req.body.password));
    } catch (e) {
        next(e);
    }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await userService.signOut(req.currentUser, req.currentToken));
    } catch (e) {
        next(e);
    }
}

export const signOutAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await userService.signOutAll(req.currentUser, req.currentToken));
    } catch (e) {
        next(e);
    }
}