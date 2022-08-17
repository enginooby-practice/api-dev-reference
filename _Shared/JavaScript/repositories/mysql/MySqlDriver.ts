import * as MySQL from "mysql2";

export class MySqlDriver {
    private static connected: boolean = false;
    private static instance: MySqlDriver;

    public static Connection: MySQL.Connection;

    private constructor() {
    }

    public static async connect() {
        if (MySqlDriver.connected || MySqlDriver.instance) return;

        MySqlDriver.connected = true;

        const host = "localhost";
        const db = "task_manager";
        const username = "enginooby";
        const password = "password";
        const dialect = "mysql";

        MySqlDriver.Connection = await MySQL.createConnection({
            host: host,
            user: username,
            password: password,
            insecureAuth: true,
        });

        await MySqlDriver.Connection.connect(async function (err) {
            if (err) {
                console.error('Failed to connect to MySQL: ' + err.stack);
                return;
            }

            console.log('Connected to MySQL as id ' + MySqlDriver.Connection.threadId);

            // connection.query("CREATE DATABASE IF NOT EXISTS task_manager", function (err, result) {
            //     if (err) throw err;
            //
            //     console.log("Database task_manager found");
            // });
            //

            const createDbResult = await MySqlDriver.Connection.promise().query(`CREATE DATABASE IF NOT EXISTS ${db}`);
            console.log(createDbResult);
            const selectDbResult = await MySqlDriver.Connection.promise().query(`USE ${db}`)
            console.log(selectDbResult);

            const createUserTableSql = "CREATE TABLE IF NOT EXISTS users (id VARCHAR(255), username VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
            MySqlDriver.Connection.query(createUserTableSql, function (err, result) {
                if (err) throw err;
                console.log("Table Users created");
            });

            const createTaskTableSql = "CREATE TABLE IF NOT EXISTS tasks (id VARCHAR(255), title VARCHAR(255), status VARCHAR(255),  VARCHAR(255))";
            MySqlDriver.Connection.query(createTaskTableSql, function (err, result) {
                if (err) throw err;
                console.log("Table Tasks created");
            });
        });
    }
}