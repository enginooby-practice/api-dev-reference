import Router from "koa-router";
import {taskRepository} from "../_Shared/JavaScript/repositories/repositoryManager";
import {StatusCodes} from "http-status-codes";

export const taskRouter = new Router({
    prefix: "/api/tasks"
});

taskRouter.get("/", async ctx => {
    ctx.response.status = StatusCodes.OK;
    ctx.body = await taskRepository.getAll();
})

taskRouter.get("/:id", async ctx => {
    ctx.response.status = StatusCodes.OK;
    ctx.body = await taskRepository.getById(ctx.params.id);
})

taskRouter.post("/", async ctx => {
    ctx.response.status = StatusCodes.CREATED;
    // @ts-ignore
    ctx.body = await taskRepository.create(ctx.request.body);
})

taskRouter.delete("/:id", async ctx => {
    ctx.response.status = StatusCodes.OK;
    ctx.body = await taskRepository.delete(ctx.params.id);
})

taskRouter.patch("/:id", async ctx => {
    ctx.response.status = StatusCodes.OK;
    // @ts-ignore
    ctx.body = await taskRepository.update(ctx.params.id, ctx.request.body);
})