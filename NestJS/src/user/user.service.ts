import {Injectable} from '@nestjs/common';
import {UserService as UserServiceBase} from "../_Shared/JavaScript/services/UserService";

@Injectable()
export class UserService extends UserServiceBase {
}
