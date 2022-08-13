import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {userRepository} from "../repositories/repository-manager";

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, "enginooby") as jwt.JwtPayload; // MAGIC
        const user = await userRepository.findById(decoded.id);

        if (!user || !user.tokens.includes(token)) {
            throw new Error();
        }

        req.user = user;
        req.token = token;

        next();
    } catch (e) {
        res.status(401).send({error: "Unauthorized."});
    }
}