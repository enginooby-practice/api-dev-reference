import { Hono } from 'hono';
import taskRouter from './routers/taskRouter';

const app = new Hono()
app.route("/api/v1/tasks", taskRouter);

export default {
  port: 6969,
  fetch: app.fetch,
}