import Express from "express";
import logger from "morgan";
import {taskRouter} from "./routers/taskRouter"
import {userRouter} from "./routers/userRouter"
import {fallbackRouter} from "./middlewares/fallbackRouter";
import {errorHandler} from "./middlewares/errorHandler";

const app = Express();
const PORT = process.env.PORT || 6969;
const NODE_ENV = process.env.NODE_ENV || "development";
app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(Express.json());
app.use(logger('tiny'));
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use(fallbackRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Express started on Port ${app.get('port')} | Environment : ${app.get('env')}`));