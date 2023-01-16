import { UUIDV4 } from "sequelize";
import { Model, Column, Table, Unique, IsEmail, IsUUID, Length, DeletedAt, CreatedAt, UpdatedAt, PrimaryKey, Default, AutoIncrement, Index, HasMany, BelongsToMany } from "sequelize-typescript";
import { Role, UserRole } from "src/roles/entities/role.entity";

@Table
export class User extends Model<User> {
    @IsUUID(4)
    @Unique
    @Index
    @Default(UUIDV4)
    @Column('VARCHAR(36)')
    uuid: string;

    @Unique
    @Index
    @Length({ min: 1, max: 31 })
    @Column('VARCHAR(32)')
    username: string;

    @Length({ min: 60, max: 60 })
    @Column('VARCHAR(60)')
    password: string;

    @IsEmail
    @Unique
    @Index
    @Length({ min: 3, max: 255 })
    @Column('VARCHAR(255)')
    email: string;

    @Length({ min: 1, max: 63 })
    @Column('VARCHAR(63)')
    name: string;

    @BelongsToMany(() => Role, { as: 'roles', through: () => UserRole })
    roles: Role[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    archiveDate: Date;
}