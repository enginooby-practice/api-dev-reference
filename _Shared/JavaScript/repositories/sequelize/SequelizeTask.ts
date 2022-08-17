import * as Sequelize from 'sequelize'
import {SequelizeDriver} from "./SequelizeDriver";
import {TaskStatus} from "../../models/Task";


export let SequelizeTask: Sequelize.ModelCtor<Sequelize.Model<any, any>>;
let isDefined: boolean = false;

export function defineSequelizeTask() {
    if (isDefined) return;
    isDefined = true;

    SequelizeTask = SequelizeDriver.sequelize.define('task', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: TaskStatus.InProgress.toString(),
        },
        isArchived: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
}