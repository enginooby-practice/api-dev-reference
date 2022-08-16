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
            } as unknown as ConnectionOptions;

            return await connect(process.env.MONGODB_URI, connectionOptions);
            // return console.log(">>> Connected to MongoDB database.");
        } catch (e) {
            return console.log(e);
        }
    }
}