import { Router } from "./deps.ts";

const taskRouter = new Router();

taskRouter.get("/api/v1/hello", (context) => {
  context.response.body = {
    success: true,
    msg: "Hello, Deno!",
  };
});

export default taskRouter;
