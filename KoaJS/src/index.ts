import * as Koa from "koa";
import * as Router from "koa-router";

const app = new Koa();
const router = new Router();

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

router.get("/", async (context: Koa.Context) => {
    context.body = "Hello, KoaJS!";
});

app.use(router.routes());
app.listen(6969, () => {
    console.log("Server running on port 6969");
});