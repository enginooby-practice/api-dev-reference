import * as Sequelize from 'sequelize'
import {SequelizeDriver} from "./SequelizeDriver";
import {defineSequelizeTask, SequelizeTask} from './SequelizeTask';


export let SequelizeUser: Sequelize.ModelCtor<Sequelize.Model<any, any>>;
let isDefined: boolean = false;

export function defineSequelizeUser() {
    if (isDefined) return;
    isDefined = true;

    SequelizeUser = SequelizeDriver.sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        tokens: {
            type: Sequelize.STRING(2000),
            defaultValue: "",
            get() {
                return this.getDataValue('tokens').split(';')
            },
            set(val) {
                // @ts-ignore
                this.setDataValue('tokens', val.join(';'));
            },
        }
    });

    defineSequelizeTask();

    SequelizeUser.hasMany(SequelizeTask, {
        foreignKey: 'ownerId'
    });
}
