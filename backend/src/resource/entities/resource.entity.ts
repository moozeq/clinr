import { UUIDV4 } from "sequelize";
import { AllowNull, Column, DataType, Default, IsUUID, Length, Model, PrimaryKey, Unique } from "sequelize-typescript";

export class Resource<T> extends Model<T> {
    @PrimaryKey
    @IsUUID(4)
    @Default(UUIDV4)
    @Column('VARCHAR(36)')
    readonly uuid!: string;

    @Length({ min: 1, max: 255 })
    @Column('VARCHAR(255)')
    name!: string;

    @AllowNull
    @Length({ max: 1023 })
    @Column('VARCHAR(1023)')
    description?: string;

    @Default({})
    @Column(DataType.JSONB)
    meta?: any;
}