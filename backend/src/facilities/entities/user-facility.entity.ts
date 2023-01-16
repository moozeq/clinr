import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";
import { Facility } from "./facility.entity";

@Table
export class UserFacility extends Model<UserFacility> {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Facility)
    @Column
    facilityId: number
}