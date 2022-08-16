import {Sequelize} from 'sequelize'
import {defineSequelizeTask} from "./SequelizeTask";
import {defineSequelizeUser} from "./SequelizeUser";

export class SequelizeDriver {
    private static connected: boolean = false;
    private static instance: SequelizeDriver;

    public static sequelize: Sequelize;

    private constructor() {
    }

    public static async connect() {
        if (SequelizeDriver.connected || SequelizeDriver.instance) return;

        SequelizeDriver.connected = true;
        // ! Must create database manually beforehand

        const host = "localhost";
        const db = process.env.SEQUELIZE_DB;
        const username = "enginooby";
        const password = "password";
        const dialect = "mysql";

        SequelizeDriver.sequelize = new Sequelize(db, username, password, {
            host: host,
            dialect: dialect,
            port: 3306,
        });

        // SequelizeDriver.sequelize = new Sequelize(db, username, password, {
        //     host: host,
        //     dialect: "mariadb",
        //     port: 3307,
        // });

        // SequelizeDriver.sequelize = new Sequelize(db, username, password, {
        //     dialect: 'sqlite',
        //     host: './task_manager.sqlite'
        // });

        await SequelizeDriver.sequelize.authenticate().then(() => {
            console.log(`Connected to ${dialect} ${db} database using Sequelize.`);

            // DECOUPLE
            defineSequelizeTask();
            defineSequelizeUser();
        }).catch(err => {
            console.log(`Failed to connect to ${dialect} database using Sequelize.`, err);
        })

        const recreateTables = true;
        return await SequelizeDriver.sequelize.sync({force: recreateTables});
    }
}