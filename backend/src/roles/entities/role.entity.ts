import { UUIDV4 } from "sequelize";
import { BelongsToMany, Column, Default, ForeignKey, Index, IsUUID, Length, Model, Table, Unique } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { UserRole } from "./role-user.entity";

@Table
export class Role extends Model<Role> {
    @IsUUID(4)
    @Unique
    @Index
    @Default(UUIDV4)
    @Column('VARCHAR(36)')
    uuid: string;
    
    @Unique
    @Length({ min: 1, max: 63 })
    @Column('VARCHAR(63)')
    name: string;

    @BelongsToMany(() => User, { as: 'users', through: () => UserRole })
    users: User[];
}