import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 6969;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use('/', require(path.join(__dirname, 'routes')));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} Not Found`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
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