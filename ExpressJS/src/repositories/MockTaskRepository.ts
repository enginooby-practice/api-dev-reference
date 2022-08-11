import {MockBaseRepository} from "./MockBaseRepository";
import {Task} from "../entities/Task";
import {ITaskRepository} from "./ITaskRepository";

export class MockTaskRepository extends MockBaseRepository<Task> implements ITaskRepository {
    findByTitle(title: string): Promise<Task[]> {
        return Promise.resolve(this._entities.filter(e => e.title.toUpperCase().includes(title.toUpperCase())));
    }
}