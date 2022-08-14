// ? Custom types for response & error
// ? Merge controller & router
import {NextFunction, Request, Response} from "express";
import {taskService} from "../services/TaskService";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await taskService.getAll(req.query.title as string));
    } catch (e) {
        next(e);
    }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await taskService.findById(req.params.id))
    } catch (e) {
        next(e);
    }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await taskService.delete(req.params.id))
    } catch (e) {
        next(e);
    }
};

export const createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(201).json(await taskService.create(req.body, req.currentUser.id));
    } catch (e) {
        next(e);
    }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await taskService.update(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
}