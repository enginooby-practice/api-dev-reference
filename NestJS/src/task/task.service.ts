import {Injectable} from '@nestjs/common';
import {TaskService as TaskServiceBase} from "../_Shared/JavaScript/services/TaskService";

@Injectable()
export class TaskService extends TaskServiceBase {
}
