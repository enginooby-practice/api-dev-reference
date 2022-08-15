import {app} from "./app";

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
app.set('port', PORT);
app.set('env', NODE_ENV);

app.listen(PORT, () => console.log(`Express started on Port ${app.get('port')} | Environment : ${app.get('env')}`));