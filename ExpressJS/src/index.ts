import {app} from "./app";

app.set('port', process.env.PORT);
app.set('env', process.env.NODE_ENV);
app.listen(process.env.PORT, () => console.log(`Express started on Port ${app.get('port')} | Environment : ${app.get('env')}`));


