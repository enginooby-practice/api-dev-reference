import Express from "express";
import * as path from "path";
import {MockTaskRepository} from "../repositories/MockTaskRepository";

// TODO: Get from root folder
const taskRepository = new MockTaskRepository(path.join(__dirname, "../../_Shared/todolist.json"));

const getAll = async (req, res, next) => {
    try {
        // search query
        const titleQuery = req.query.title;
        if (titleQuery) {
            return res.json(await taskRepository.findByTitle(titleQuery));
        }

        return res.json(await taskRepository.getAll())
    } catch (e) {
        next(e);
    }
};

const getOne = async (req, res, next) => {
    try {
        return res.json(await taskRepository.findById(req.params.id))
    } catch (e) {
        next(e);
    }
};

const deleteOne = async (req, res, next) => {
    try {
        return res.json(await taskRepository.delete(req.params.id))
    } catch (e) {
        next(e);
    }
};

const PREFIX = "/api/tasks"
const router = Express.Router();

router
    .route(PREFIX)
    .get(getAll);

router
    .route(`${PREFIX}/:id`)
    .get(getOne)
    .delete(deleteOne)

module.exports = router;
