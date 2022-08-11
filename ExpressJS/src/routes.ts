import Express from "express";
import * as path from "path";
import {MockTaskRepository} from "./repositories/MockTaskRepository";

const router = Express.Router();

// TODO: Get from root folder
const taskRepository = new MockTaskRepository(path.join(__dirname, "../_Shared/todolist.json"));

const getAll = async (req, res, next) => {
    try {
        const tasks = await taskRepository.getAll();

        // search query
        const titleQuery = req.query.title;
        if (titleQuery) {
            const filterTasks = tasks.filter(e => e.title.toUpperCase().includes(titleQuery.toUpperCase()));
            return res.json(filterTasks);
        }

        return res.json(tasks)
    } catch (e) {
        next(e);
    }
};

router
    .route("/api")
    .get(getAll);

module.exports = router;
