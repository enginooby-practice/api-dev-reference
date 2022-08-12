// REFACTOR: duplicated code in routers
import Express from "express";
import {Request, Response, NextFunction} from 'express';
import * as path from "path";
import {MockTaskRepository} from "../repositories/mock/MockTaskRepository";
import {ITaskRepository} from "../repositories/base/ITaskRepository";
import {MongoDbTaskRepository} from "../repositories/mongodb/MongoDbTaskRepository";

let taskRepository: ITaskRepository;
taskRepository = new MockTaskRepository(path.join(__dirname, "../../_Shared/todolist.json")); // TODO: Get from root folder
// taskRepository = new MongoDbTaskRepository();

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
        const succeed = await taskRepository.create(req.body);
        return res.status(201).json({"created": succeed});
    } catch (e) {
        // 400
        next(e);
    }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatingKeys = Object.keys(req.body);
        const mutableKeys = ["title", "status", "is_archived", "priority", "tags"]; // REFACTOR: get property names of a type
        const isRequestValid = updatingKeys.every(key => mutableKeys.includes(key));

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

// module.exports = taskRouter;
