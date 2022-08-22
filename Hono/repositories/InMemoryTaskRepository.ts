import { Task, TaskStatus } from "../models/Task";

class InMemoryTaskRepository {
  private entities: Task[] = [];

  constructor() {
    this.entities.push(new Task("1", "Task 1", TaskStatus.Completed, true, 1, [], 1, null, null));
    this.entities.push(new Task("2", "Task 2", TaskStatus.NotStarted, true, 1, [], 1, null, null));
    this.entities.push(new Task("3", "Task 3", TaskStatus.InProgress, true, 1, [], 1, null, null));
    // Bun.file("../tasks.json").json()
    //   .then(jsonText => this.entities = <Task[]>JSON.parse(jsonText))
    //   .catch(e => console.log(e));
  }

  async getAll(): Promise<Task[]> {
    return await Promise.resolve(this.entities);
  }

  async getById(id: string): Promise<Task> {
    return await Promise.resolve(this.entities.find(e => e.id == id) as Task);
  }

  async create(entity: Task) {
    this.entities.push(entity);

    return await Promise.resolve(entity);
  }

  async update(id: string, entity: Task): Promise<boolean> {
    const oldEntity = await this.getById(id);

    if (oldEntity) {
      // keep keys that new entity missing from the old entity
      const properties = Object.keys(oldEntity);
      // @ts-ignore
      properties.forEach(prop => entity[prop] ??= oldEntity[prop])

      const index = this.entities.indexOf(oldEntity);
      this.entities[index] = entity;

      return Promise.resolve(true);
    }

    return Promise.reject(new Error("Entity not found."));
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.getById(id);

    for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i] === entity) {
        this.entities.splice(i, 1);
        return Promise.resolve(true);
      }
    }

    return Promise.reject(new Error("Entity not found."));
  }

  async deleteAll(): Promise<boolean> {
    this.entities.length = 0;

    return await Promise.resolve(true);
  }
}

export const taskRepository = new InMemoryTaskRepository();