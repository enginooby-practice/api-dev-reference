import {User as UserBase,} from "../../models/user/User";
import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class TypeOrmUser extends UserBase {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    public username: string;

    @Column()
    public password: string

    @Column()
    public email: string;
}