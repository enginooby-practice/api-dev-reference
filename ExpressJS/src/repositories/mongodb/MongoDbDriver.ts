import {MongoClient, Db, ObjectId} from "mongodb";
import {connect} from "mongoose";
import * as Mongoose from "mongoose";

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

export class MongoDbDriver {
    private static connected: boolean = false;
    private static instance: MongoDbDriver;

    private constructor() {
    }

    public static getInstance() {
        if (!MongoDbDriver.instance && !MongoDbDriver.connected) {
            MongoDbDriver.connect();
            MongoDbDriver.instance ??= new MongoDbDriver();
        }

        return MongoDbDriver.instance;
    }

    public static connect(): Promise<any> {
        if (MongoDbDriver.connected) return;

        MongoDbDriver.connected = true;

        if (!MongoDbDriver.instance) {
            return connect(`${connectionUrl}/${databaseName}`)
                .then(r => console.log(">>> Connected to MongoDB database."))
                .catch(e => console.log(e))
        }
    }
}