import {NextFunction, Request, Response} from "express";

export const errorHandler = async (error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(error.status || 500);
    res.json({error: error.message});
};