import {NextFunction, Request, Response} from "express";
import {userService} from "../_Shared/JavaScript/services/UserService";

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = await userService.authenticate(token);

        if (!user) {
            throw new Error();
        }

        req.currentUser = user;
        req.currentToken = token;

        next();
    } catch (e) {
        res.status(401).send({error: "Unauthorized."});
    }
}