import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

export const errorHandler = async (error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({error: error.message});
};