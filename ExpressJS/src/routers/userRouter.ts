// REFACTOR: duplicated try-catch
import Express, {NextFunction, Request, Response} from "express";
import {authHandler} from "../middlewares/authHandler";
import {StatusCodes} from "http-status-codes";
import {userService} from "../services/UserService";


export const userRouter = Express.Router();

// sign up
userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.CREATED).json(await userService.signUp(req.body));
    } catch (e) {
        e.status = StatusCodes.BAD_REQUEST;
        next(e);
    }
})

// sign in
userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).send(await userService.signIn(req.body.email, req.body.password));
    } catch (e) {
        e.status = StatusCodes.BAD_REQUEST;
        next(e);
    }
})

// sign out on 1 device
userRouter.post("/logout", authHandler, async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).send(await userService.signOut(req.currentUser, req.currentToken));
    } catch (e) {
        next(e);
    }
})

// sign out on all devices
userRouter.post("/logoutAll", authHandler, async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).send(await userService.signOutAll(req.currentUser));
    } catch (e) {
        next(e);
    }
})

// get profile
userRouter.get("/me", authHandler, async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).json(req.currentUser);
    } catch (e) {
        next(e);
    }
})

// update user
userRouter.patch("/me", authHandler, async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).json(await userService.update(req.params.id, req.body));
    } catch (e) {
        next(e);
    }
})

// delete user
userRouter.delete("/me", authHandler, async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(StatusCodes.OK).json(await userService.delete(req.currentUser.id))
    } catch (e) {
        next(e);
    }
})