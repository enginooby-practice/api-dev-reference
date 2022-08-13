import Express from "express";
import logger from "morgan";
import {taskRouter} from "./routers/TaskRouter"
import {userRouter} from "./routers/UserRouter"
import {fallbackRouter} from "./middleware/fallback-router";
import {errorHandler} from "./middleware/error-handler";

const app = Express();
const PORT = process.env.PORT || 6969;
const NODE_ENV = process.env.NODE_ENV || "development";
app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(Express.json());
app.use(logger('tiny'));
app.use(taskRouter);
app.use(userRouter);
app.use(fallbackRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Express started on Port ${app.get('port')} | Environment : ${app.get('env')}`));