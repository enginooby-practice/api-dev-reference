import Express from "express";
import {Request, Response, NextFunction} from 'express';
import * as path from "path";
import {MockUserRepository} from "../repositories/mock/MockUserRepository";
import {User} from "../entities/User";
import {MongoDbUserRepository} from "../repositories/mongodb/MongoDbUserRepository";
import {IUserRepository} from "../repositories/base/IUserRepository";

let userRepository: IUserRepository;
// userRepository = new MockUserRepository(path.join(__dirname, "../../_Shared/users.json")); // TODO: Get from root folder
userRepository = new MongoDbUserRepository();

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
        return res.status(201).json({"created": succeed});
    } catch (e) {
        // 400
        next(e);
    }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // ? Allow to pass immutable fields with unchanged values
        const updatingKeys = Object.keys(req.body);
        const mutableKeys = ["username", "password", "tokens"]; // REFACTOR: get property names of a type
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

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.findByCredentials(req.body.email, req.body.password);
        await user.generateAuthToken();
        await userRepository.save(user);

        res.send(user)
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
    .route(`${PREFIX}/login`)
    .post(login)

userRouter
    .route(`${PREFIX}/:id`)
    .get(getOne)
    .delete(deleteOne)
    .patch(updateOne)
