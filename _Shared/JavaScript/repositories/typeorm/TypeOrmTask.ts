import {Task, TaskStatus} from "../../models/Task";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("tasks")
export class TypeOrmTask extends Task {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    status: TaskStatus;

    @Column()
    isArchived: boolean;

    @Column()
    priority: number;

    @Column()
    ownerId: string;
}