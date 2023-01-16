import { UUIDV4 } from "sequelize";
import { Column, CreatedAt, Default, Index, IsEmail, IsUUID, Length, Table, Unique, UpdatedAt, DeletedAt, BelongsToMany, Model, AllowNull } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { UserFacility } from "./user-facility.entity";

@Table
export class Facility extends Model<Facility> {
    @IsUUID(4)
    @Unique
    @Index
    @Default(UUIDV4)
    @Column('VARCHAR(36)')
    uuid: string;

    @Length({ min: 1, max: 255 })
    @Unique
    @Index
    @Column('VARCHAR(255)')
    name: string;

    @Length({ max: 1023 })
    @Column('VARCHAR(1023)')
    description: string;

    @Length({ min: 1, max: 255 })
    @Column('VARCHAR(255)')
    address: string;

    @IsEmail
    @AllowNull
    @Length({ min: 3, max: 255 })
    @Column('VARCHAR(255)')
    email: string;

    @AllowNull
    @Length({ min: 1, max: 15 })
    @Column('VARCHAR(15)')
    telephone: string;

    @BelongsToMany(() => User, { as: 'doctors', through: () => UserFacility })
    doctors: User[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    archiveDate: Date;
}
