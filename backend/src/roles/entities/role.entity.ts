import { UUIDV4 } from "sequelize";
import { BelongsToMany, Column, CreatedAt, Default, DeletedAt, Index, IsUUID, Length, Model, Scopes, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { SeqScope } from "src/utils";
import { UserRole } from "./role-user.entity";

@Scopes(() => ({
    [SeqScope.Full]: {
        include: [User],
    }
}))
@Table
export class Role extends Model<Role> {
    @IsUUID(4)
    @Unique
    @Index
    @Default(UUIDV4)
    @Column('VARCHAR(36)')
    readonly uuid!: string;
    
    @Unique
    @Length({ min: 1, max: 63 })
    @Column('VARCHAR(63)')
    name!: string;

    @BelongsToMany(() => User, () => UserRole)
    users?: User[];

    @CreatedAt
    readonly createdAt!: Date;

    @UpdatedAt
    readonly updatedAt!: Date;

    @DeletedAt
    readonly archiveDate!: Date;
}