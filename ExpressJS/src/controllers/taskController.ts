// ? Custom types for response & error
// ? Merge controller & router
import {NextFunction, Request, Response} from "express";
import {taskService} from "../services/TaskService";
import {ITaskSorter, SortOrder, Task, TaskStatus} from "../entities/Task";
import {IPaginator} from "../entities/IPaginator";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = parseFilter(req);
        const paginator = parsePaginator(req);
        const sorter = parseSorter(req);

        return res.json(await taskService.getAll(req.currentUser.id, req.query.title as string, filter, paginator, sorter));
    } catch (e) {
        next(e);
    }
};

function parseFilter(req: Request): Partial<Task> {
    const filter: Partial<Task> = {};

    if (req.query.isArchived) filter.isArchived = req.query.isArchived === "true";
    if (req.query.priority) filter.priority = parseInt(req.query.priority as string);
    if (req.query.status) filter.status = TaskStatus[getEnumKeyByValue(TaskStatus, req.query.status as string)];

    return filter;
}

function parsePaginator(req: Request): IPaginator {
    const paginator: IPaginator = {};

    if (req.query.limit) {
        paginator.limit = parseInt(req.query.limit as string);
        if (req.query.page) paginator.page = parseInt(req.query.page as string);
    }

    return paginator;
}

function parseSorter(req: Request): ITaskSorter {
    const sorter: ITaskSorter = {};

    if (req.query.sortBy) {
        const criteria = (req.query.sortBy as string).split(' '); // delimiter "+"
        criteria.forEach((cri) => {
            const partSplit = cri.split(':');
            const sortKey = partSplit[0];
            const sortOrder = partSplit[1].toLowerCase();
            sorter[sortKey] = sortOrder === "desc" ? SortOrder.Desc : SortOrder.Esc;
        })
    }

    return sorter;
}

// REFACTOR
function getEnumKeyByValue(myEnum, enumValue): any {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await taskService.findById(req.currentUser.id, req.params.id))
    } catch (e) {
        next(e);
    }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json(await taskService.delete(req.currentUser.id, req.params.id))
    } catch (e) {
        next(e);
    }
};

export const createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(201).json(await taskService.create(req.currentUser.id, req.body));
    } catch (e) {
        next(e);
    }
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(await taskService.update(req.currentUser.id, req.params.id, req.body));
    } catch (e) {
        next(e);
    }
}