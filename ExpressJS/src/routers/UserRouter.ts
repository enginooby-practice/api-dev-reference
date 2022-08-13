import Express from "express";
import {Request, Response, NextFunction} from 'express';
import {authHandler} from "../middleware/auth-handler";
import {userRepository} from "../repositories/repository-manager";
import {User} from "../entities/User";

// REFACTOR: duplicated try-catch

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

const getSignedInProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = req.user;
        return res.json(currentUser);
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

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await userRepository.create(req.body);
        const token = await newUser.generateAuthToken();

        return res.status(201).json({newUser, token});
    } catch (e) {
        e.status = 400;
        next(e);
    }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userRepository.findByCredentials(req.body.email, req.body.password);
        await user.generateAuthToken();
        await userRepository.save(user);

        res.send(user);
    } catch (e) {
        next(e);
    }
}

const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = req.user;
        currentUser.tokens = currentUser.tokens.filter(token => token != req.token);
        await userRepository.save(currentUser);

        res.send({"message": "Logged out"});
    } catch (e) {
        next(e);
    }
}

const signOutAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentUser = req.user;
        currentUser.tokens = [];
        await userRepository.save(currentUser);

        res.send({"message": "Logged all out"});
    } catch (e) {
        next(e);
    }
}

const PREFIX = "/api/users"
export const userRouter = Express.Router();

userRouter
    .route(PREFIX)
    .get(getAll)
    .post(signUp)

userRouter
    .route(`${PREFIX}/login`)
    .post(signIn)

userRouter
    .route(`${PREFIX}/logout`)
    .post(authHandler, signOut)

userRouter
    .route(`${PREFIX}/logoutAll`)
    .post(authHandler, signOutAll)

userRouter
    .route(`${PREFIX}/me`)
    .get(authHandler, getSignedInProfile)

userRouter
    .route(`${PREFIX}/:id`)
    .get(getOne)
    .delete(deleteOne)
    .patch(updateOne)
