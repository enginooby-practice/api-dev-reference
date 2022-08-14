import Express from "express";
import {createOne, deleteOne, getAll, getOne, updateOne} from "../controllers/taskController";

export const taskRouter = Express.Router();

taskRouter
    .route("/")
    .get(getAll)
    .post(createOne)

taskRouter
    .route("/:id")
    .get(getOne)
    .delete(deleteOne)
    .patch(updateOne)
