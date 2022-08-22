import { Application } from "./deps.ts";
import taskRouter from "./routes.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 6969;
const HOST = env.HOST || 'localhost';

const app = new Application();
app.use(taskRouter.routes());
app.use(taskRouter.allowedMethods());
app.listen(`${HOST}:${PORT}`);

console.log(`Server running on port ${PORT}`);
