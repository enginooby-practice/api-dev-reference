import Express from "express";
import * as path from "path";
import {MockTaskRepository} from "../repositories/task/mock/MockTaskRepository";
import {ITaskRepository} from "../repositories/task/ITaskRepository";
import {MongoDbTaskRepository} from "../repositories/task/mongodb/MongoDbTaskRepository";

let taskRepository: ITaskRepository;
taskRepository = new MockTaskRepository(path.join(__dirname, "../../_Shared/todolist.json")); // TODO: Get from root folder
// taskRepository = new MongoDbTaskRepository();

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

const createOne = async (req, res, next) => {
    try {
        const succeed = await taskRepository.create(req.body);
        return res.status(201).json({"created": succeed});
    } catch (e) {
        // 400
        next(e);
    }
}

const updateOne = async (req, res, next) => {
    try {
        const succeed = await taskRepository.update(req.params.id, req.body);
        return res.status(200).json({"updated": succeed});
    } catch (e) {
        next(e);
    }
}

const PREFIX = "/api/tasks"
const router = Express.Router();

router
    .route(PREFIX)
    .get(getAll)
    .post(createOne)

router
    .route(`${PREFIX}/:id`)
    .get(getOne)
    .delete(deleteOne)
    .put(updateOne)

module.exports = router;
