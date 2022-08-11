import {MockBaseRepository} from "./MockBaseRepository";
import {Task} from "../entities/Task";
import {ITaskRepository} from "./ITaskRepository";

export class MockTaskRepository extends MockBaseRepository<Task> implements ITaskRepository {
    create(entity: Task): Promise<boolean> {
        return Promise.resolve(false);
    }

    delete(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    find(entity: Task): Promise<Task[]> {
        return Promise.resolve([]);
    }

    findById(id: string): Promise<Task> {
        return Promise.resolve(undefined);
    }

    getAll(): Promise<Task[]> {
        return Promise.resolve(this._entities);
    }

    update(id: string, entity: Task): Promise<boolean> {
        return Promise.resolve(false);
    }

    findByTitle(title: string): Promise<Task[]> {
        return Promise.resolve(this._entities.filter(e => e.title.toUpperCase().includes(title.toUpperCase())));
    }
}