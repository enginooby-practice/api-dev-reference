import Express from "express";
import * as path from "path";
import logger from "morgan";

const app = Express();
const PORT = process.env.PORT || 6969;
const NODE_ENV = process.env.NODE_ENV || "development";

app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(logger('tiny'));
app.use(Express.json()); // auto parse request to JSON (req.body)
app.use('/', require(path.join(__dirname, 'routes/TaskRouter')));

app.use((req: Express.Request, res: Express.Response, next) => {
    const error = new Error(`${req.method} ${req.url} Not Found`);
    // @ts-ignore
    error.status = 404;
    next(error);
});

app.use((error, req: Express.Request, res: Express.Response, next) => {
    console.error(error);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

app.listen(PORT, () => {
    console.log(`Express Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`
    );
})