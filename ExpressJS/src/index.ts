import Express from "express";
import {Request, Response, NextFunction} from 'express';
import logger from "morgan";
import {taskRouter} from "./routers/TaskRouter"
import {userRouter} from "./routers/UserRouter"

const app = Express();
const PORT = process.env.PORT || 6969;
const NODE_ENV = process.env.NODE_ENV || "development";

app.set('port', PORT);
app.set('env', NODE_ENV);

// Express.json() middleware looks for incoming requests that have a Content-Type header of 'application/json'
// and puts the properties on req.body to access.
// ! Must invoke this before any router.
app.use(Express.json());
app.use(logger('tiny'));
app.use(taskRouter);
app.use(userRouter);

// fallback routers
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`${req.method} ${req.url} Not Found`);
    // @ts-ignore
    error.status = 404;
    next(error); // run the next middleware
});

app.use((error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

app.listen(PORT, () => {
    console.log(`Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`
    );
})