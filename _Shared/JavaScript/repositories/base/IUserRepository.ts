import {User} from "../../models/user/User";
import {Task} from "../../models/task/Task";
import {IGetDto, IPaginator} from "../../models/base/IDto";
import {TaskSortDto} from "../../models/task/TaskSortDto";
import {ICrudable} from "./ICrudable";

export interface IUserRepository extends ICrudable<User> {
    // ? Move to User/AuthService
    getByCredentials(email: string, password: string): Promise<User>;

    // Implement sorting, filtering, paginating for endpoint that may return many records
    getTasksOf(id: string, filter?: Partial<Task>, paginator?: IPaginator, sorter?: TaskSortDto): Promise<Task[] | IGetDto<Task>[]>;
}