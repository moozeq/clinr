import { Exclude } from "class-transformer";
import { UUIDV4 } from "sequelize";
import { Model, Column, Table, Unique, IsEmail, IsUUID, Length, DeletedAt, CreatedAt, UpdatedAt, PrimaryKey, Default, AutoIncrement } from "sequelize-typescript";

@Table
export class User extends Model<User> {
    @IsUUID(4)
    @Default(UUIDV4)
    @Column('VARCHAR(36)')
    uuid: string;

    @IsEmail
    @Unique
    @Length({ min: 3, max: 31 })
    @Column('VARCHAR(32)')
    login: string;

    @Length({ min: 60, max: 60 })
    @Column('VARCHAR(60)')
    password: string;

    @Length({ min: 1, max: 31 })
    @Column('VARCHAR(32)')
    name: string;
    
    @CreatedAt
    createdAt: Date;
    
    @UpdatedAt
    updatedAt: Date;
  
    @DeletedAt
    archiveDate: Date;
}