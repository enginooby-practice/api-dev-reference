import {ConnectionOptions} from "mongodb";
import {connect} from "mongoose";

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
        if (MongoDbDriver.connected || MongoDbDriver.instance) return;

        MongoDbDriver.connected = true;

        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as unknown as ConnectionOptions;

        return connect(`${connectionUrl}/${databaseName}`, connectionOptions)
            .then(r => console.log(">>> Connected to MongoDB database."))
            .catch(e => console.log(e))
    }
}