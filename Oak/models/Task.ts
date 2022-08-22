export class Task {
  constructor(
    public id: string,
    public title: string,
    public status: TaskStatus,
    public isArchived: boolean,
    public priority: number,
    public tags: string[],
    public ownerId: any,
    public updateAt: Date,
    public createAt: Date,
  ) { }
}

export enum TaskStatus {
  NotStarted = "Not started",
  InProgress = "In progress",
  Completed = "Completed"
}