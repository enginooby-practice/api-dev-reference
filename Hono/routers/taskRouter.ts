import { Hono } from 'hono';
import { taskRepository } from '../repositories/JsonTaskRepository';

const taskRouter = new Hono()

taskRouter
  .get("/", async ctx => {
    const result = await taskRepository.getAll();

    return ctx.json(result, 200);
  })
  .post(async ctx => {
    const dto = await ctx.req.parseBody();
    const result = await taskRepository.create(dto as any);

    return ctx.json(result, 201);
  })

taskRouter
  .get("/:id", async ctx => {
    const id = ctx.req.param("id");
    const result = await taskRepository.getById(id);

    return ctx.json(result, 200);
  })
  // FIX: Delete request of Hono is not correct
  // https://github.com/honojs/hono/issues/440
  .delete(async ctx => {
    const id = ctx.req.param("id");
    const result = await taskRepository.delete(id);

    return ctx.json(result, 200);
  })
  .patch(async ctx => {
    const id = ctx.req.param("id");
    const dto = await ctx.req.parseBody();
    const result = await taskRepository.update(id, dto as any);

    return ctx.json(result, 200);
  })

export default taskRouter;