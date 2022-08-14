import {NextFunction, Request, Response} from "express";

// 404 catching
export const fallbackRouter = async (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`${req.method} ${req.url} Not Found`);
    // @ts-ignore
    error.status = 404;
    next(error); // run the next middleware
};