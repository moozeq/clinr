import { UUIDV4 } from "sequelize";
import { AllowNull, Column, Default, IsUUID, Length, Model, Unique } from "sequelize-typescript";

export class Resource<T> extends Model<T> {
    @IsUUID(4)
    @Unique
    @Default(UUIDV4)
    @Column('VARCHAR(36)')
    readonly uuid!: string;

    @Length({ min: 1, max: 255 })
    @Unique
    @Column('VARCHAR(255)')
    name!: string;

    @AllowNull
    @Length({ max: 1023 })
    @Column('VARCHAR(1023)')
    description?: string;
}