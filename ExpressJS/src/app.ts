import Express from "express";
import logger from "morgan";
import {taskRouter} from "./routers/taskRouter"
import {userRouter} from "./routers/userRouter"
import {fallbackRouter} from "./middlewares/fallbackRouter";
import {errorHandler} from "./middlewares/errorHandler";

export const app = Express();

app.use(Express.json());
app.use(logger('tiny'));
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use(fallbackRouter);
app.use(errorHandler);

