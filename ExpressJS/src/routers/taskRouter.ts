import Express from "express";
import {createOne, deleteOne, getAll, getOne, updateOne} from "../controllers/taskController";
import {authHandler} from "../middlewares/authHandler";

export const taskRouter = Express.Router();

taskRouter
    .route("/")
    .get(getAll)
    .post(authHandler, createOne)

taskRouter
    .route("/:id")
    .get(getOne)
    .delete(deleteOne)
    .patch(updateOne)
