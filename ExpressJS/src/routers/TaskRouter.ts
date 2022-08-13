// REFACTOR: duplicated code in routers
import Express from "express";
import {Request, Response, NextFunction} from 'express';
import {taskRepository} from "../repositories/repository-manager";
import {Task} from "../entities/Task";


const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // search query
        const titleQuery = req.query.title;
        if (titleQuery) {
            return res.json(await taskRepository.findByTitle(titleQuery as string));
        }

        return res.json(await taskRepository.getAll())
    } catch (e) {
        next(e);
    }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await taskRepository.findById(req.params.id))
    } catch (e) {
        next(e);
    }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await taskRepository.delete(req.params.id))
    } catch (e) {
        next(e);
    }
};

const createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTask = await taskRepository.create(req.body);
        return res.status(201).json({"created": newTask});
    } catch (e) {
        e.status = 400;
        next(e);
    }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatingKeys = Object.keys(req.body);
        const isRequestValid = updatingKeys.every(key => Task.getMutableKeys().includes(key));

        if (isRequestValid) {
            const succeed = await taskRepository.update(req.params.id, req.body);
            return res.status(200).json({"updated": succeed});
        } else {
            throw Error("Invalid updating request (tried updating immutable/non-existing keys).");
        }
    } catch (e) {
        next(e);
    }
}

const PREFIX = "/api/tasks"
export const taskRouter = Express.Router();

taskRouter
    .route(PREFIX)
    .get(getAll)
    .post(createOne)

taskRouter
    .route(`${PREFIX}/:id`)
    .get(getOne)
    .delete(deleteOne)
    .patch(updateOne)
