import {Entity, model, property} from '@loopback/repository';

export enum TaskStatus {
    NotStarted = "Not started",
    InProgress = "In progress",
    Completed = "Completed"
}

@model()
export class Task extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
    })
    title: string;

    @property({
        type: 'boolean',
        default: false,
    })
    isArchived?: boolean;

    @property({
        type: 'number',
        default: 1,
    })
    priority?: number;

    @property({
        type: 'array',
        itemType: 'string',
    })
    tags?: string[];

    @property({
        type: 'string',
        required: false,
        default: TaskStatus.InProgress,
        jsonSchema: {
            enum: Object.values(TaskStatus),
        },
    })
    status: TaskStatus;

    @property({
        type: 'date',
        required: false,
        default: () => new Date()
    })
    createAt ?: string;

    @property({
        type: 'date',
        required: false,
        default: () => new Date()
    })
    updateAt ?: string;


    constructor(data?: Partial<Task>) {
        super(data);
    }
}

export interface TaskRelations {
    // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
