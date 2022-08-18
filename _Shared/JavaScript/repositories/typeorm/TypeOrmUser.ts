import {User} from "../../models/user/User";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class TypeOrmUser extends User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    public username: string;

    @Column()
    public password: string

    @Column({unique: true})
    public email: string;

    @Column({
        type: "simple-array",
        nullable: true,
    })
    tokens: string[];
}