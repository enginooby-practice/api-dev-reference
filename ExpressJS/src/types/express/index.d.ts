// to make the file a module and avoid the TypeScript error
import {User} from "../../entities/User";

export {}

declare global {
    namespace Express {
        export interface Request {
            user?: User;
            token?: string;
        }
    }
}