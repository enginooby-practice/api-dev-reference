import {DataSource} from "typeorm";
import {TypeOrmTask} from "./TypeOrmTask";
import {TypeOrmUser} from "./TypeOrmUser";

export class TypeOrmDriver {
    private static connected: boolean = false;
    private static instance: TypeOrmDriver;

    public static dataSource: DataSource;

    private constructor() {
    }

    public static async connect() {
        if (TypeOrmDriver.connected || TypeOrmDriver.instance) return;

        TypeOrmDriver.connected = true;
        // ! Must create database manually beforehand

        TypeOrmDriver.dataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "enginooby",
            password: "password",
            database: "task_manager",
            synchronize: true,
            entities: [TypeOrmTask, TypeOrmUser],
        })

        TypeOrmDriver.dataSource.initialize()
            .then(() => {
                console.log(`>>> Connected to Postgres database via TypeORM.`);
            })
            .catch(error => {
                console.error(`>>> Failed to connected to Postgres database via TypeORM.`);
                console.log(error);
            })
    }
}