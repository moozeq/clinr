import { UUIDV4 } from "sequelize";
import { Model, Column, Table, Unique, IsEmail, IsUUID, Length, DeletedAt, CreatedAt, UpdatedAt, PrimaryKey, Default, AutoIncrement, Index, HasMany, BelongsToMany, Scopes } from "sequelize-typescript";
import { Facility } from "src/facilities/entities/facility.entity";
import { UserFacility } from "src/facilities/entities/user-facility.entity";
import { UserRole } from "src/roles/entities/role-user.entity";
import { Role } from "src/roles/entities/role.entity";
import { SeqScope } from "src/utils";

@Scopes(() => ({
    [SeqScope.Full]: {
        include: [Role, Facility],
    }
}))
@Table
export class User extends Model<User> {
    @IsUUID(4)
    @Unique
    @Index
    @Default(UUIDV4)
    @Column('VARCHAR(36)')
    readonly uuid!: string;

    @Unique
    @Index
    @Length({ min: 1, max: 31 })
    @Column('VARCHAR(32)')
    readonly username!: string;

    @Length({ min: 60, max: 60 })
    @Column('VARCHAR(60)')
    password!: string;

    @IsEmail
    @Unique
    @Index
    @Length({ min: 3, max: 255 })
    @Column('VARCHAR(255)')
    email!: string;

    @Length({ min: 1, max: 63 })
    @Column('VARCHAR(63)')
    name!: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles?: Role[];

    @BelongsToMany(() => Facility, () => UserFacility)
    facilities?: Facility[];

    @CreatedAt
    readonly createdAt!: Date;

    @UpdatedAt
    readonly updatedAt!: Date;

    @DeletedAt
    readonly archiveDate!: Date;
}