// D:\mongodb\bin\mongod.exe --dbpath=D:\mongodb-data
import {ConnectionOptions} from "mongodb";
import {connect} from "mongoose";

export class MongoDbDriver {
    private static connected: boolean = false;
    private static instance: MongoDbDriver;

    private constructor() {
    }

    public static async getInstance() {
        if (!MongoDbDriver.instance && !MongoDbDriver.connected) {
            await MongoDbDriver.connect();
            MongoDbDriver.instance ??= new MongoDbDriver();
        }

        return MongoDbDriver.instance;
    }

    public static async connect() {
        if (MongoDbDriver.connected || MongoDbDriver.instance) return;

        MongoDbDriver.connected = true;

        try {
            const connectionOptions = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                connectTimeoutMS: 1000
            } as unknown as ConnectionOptions;

            // DECOUPLE process.env.MONGODB_URI
            return await connect("mongodb://127.0.0.1:27017/task-manager", connectionOptions).then(
                () => {
                    console.log(">>> Connected to MongoDB database.");
                }
            );
        } catch (e) {
            return console.log(e);
        }
    }
}