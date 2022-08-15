// REFACTOR: duplicated try-catch
import {NextFunction, Request, Response} from "express";
import {userRepository} from "../repositories/repositoryManager";
import {User} from "../entities/User";
import {userService} from "../services/UserService";
import {taskService} from "../services/TaskService";
import {StatusCodes} from "http-status-codes";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).json(req.currentUser);
    } catch (e) {
        next(e);
    }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).json(await userService.delete(req.currentUser.id))
    } catch (e) {
        next(e);
    }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).json(await userService.update(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.CREATED).json(await userService.signUp(req.body));
    } catch (e) {
        e.status = StatusCodes.BAD_REQUEST;
        next(e);
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCodes.OK).send(await userService.signIn(req.body.email, req.body.password));
    } catch (e) {
        e.status = StatusCodes.BAD_REQUEST;
        next(e);
    }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCodes.OK).send(await userService.signOut(req.currentUser, req.currentToken));
    } catch (e) {
        next(e);
    }
}

export const signOutAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCodes.OK).send(await userService.signOutAll(req.currentUser));
    } catch (e) {
        next(e);
    }
}