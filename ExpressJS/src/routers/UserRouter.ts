import Express from "express";
import {Request, Response, NextFunction} from 'express';
import * as path from "path";
import {MockUserRepository} from "../repositories/user/MockUserRepository";
import {CrudRepository} from "../repositories/base/CrudRepository";
import {User} from "../entities/User";

let userRepository: CrudRepository<User>;
userRepository = new MockUserRepository(path.join(__dirname, "../../_Shared/users.json")); // TODO: Get from root folder

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await userRepository.getAll())
    } catch (e) {
        next(e);
    }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await userRepository.findById(req.params.id))
    } catch (e) {
        next(e);
    }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await userRepository.delete(req.params.id))
    } catch (e) {
        next(e);
    }
};

const createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const succeed = await userRepository.create(req.body);
        console.log(req.body)
        return res.status(201).json({"created": succeed});
    } catch (e) {
        // 400
        next(e);
    }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatingKeys = Object.keys(req.body);
        const mutableKeys = ["username", "password"]; // REFACTOR: get property names of a type
        const isRequestValid = updatingKeys.every(key => mutableKeys.includes(key));

        if (isRequestValid) {
            const succeed = await userRepository.update(req.params.id, req.body);
            return res.status(200).json({"updated": succeed});
        } else {
            throw Error("Invalid updating request (tried updating immutable/non-existing keys).");
        }
    } catch (e) {
        next(e);
    }
}

const PREFIX = "/api/users"
export const userRouter = Express.Router();

userRouter
    .route(PREFIX)
    .get(getAll)
    .post(createOne)

userRouter
    .route(`${PREFIX}/:id`)
    .get(getOne)
    .delete(deleteOne)
    .patch(updateOne)