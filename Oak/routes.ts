import { Router } from "./deps.ts";
import { taskRepository } from "./repositories/JsonTaskRepository.ts";

const taskRouter = new Router();

taskRouter.get("/api/v1/tasks", async (context) => {
  const tasks = await taskRepository.getAll();

  context.response.status = 200;
  context.response.body = tasks;
});

taskRouter.get("/api/v1/tasks/:id", async (context) => {
  const task = await taskRepository.getById(context.params.id);

  if (task) {
    context.response.status = 200;
    context.response.body = task;
  } else {
    context.response.status = 404;
    context.response.body = { error: "Entity not found." };
  }
});

taskRouter.post("/api/v1/tasks", async (context) => {
  const taskCreateDto = await context.request.body().value;
  const task = await taskRepository.create(taskCreateDto);

  if (task) {
    context.response.status = 201;
    context.response.body = task;
  }
});

taskRouter.patch("/api/v1/tasks/:id", async (context) => {
  const taskUpdateDto = await context.request.body().value;
  const result = await taskRepository.update(context.params.id, taskUpdateDto);

  if (result) {
    context.response.status = 200;
    context.response.body = result;
  }
});

taskRouter.delete("/api/v1/tasks/:id", async (context) => {
  const result = await taskRepository.delete(context.params.id);

  if (result) {
    context.response.status = 200;
    context.response.body = result;
  }
});


export default taskRouter;
