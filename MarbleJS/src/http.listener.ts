import {httpListener} from '@marblejs/http';
import {logger$} from '@marblejs/middleware-logger';
import {bodyParser$} from '@marblejs/middleware-body';
import {taskController} from "./task.effects";

const middlewares = [
    logger$(),
    bodyParser$(),
];

export const listener = httpListener({
    middlewares,
    effects: taskController,
});