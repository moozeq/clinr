import { AllowNull, BelongsToMany, Column, IsEmail, Length, Scopes, Table } from "sequelize-typescript";
import { Resource } from "src/resource/entities/resource.entity";
import { getTableResourceOptions } from "src/resource/resource.utils";
import { User } from "src/users/entities/user.entity";
import { SeqScope } from "src/utils";
import { UserFacility } from "./user-facility.entity";

@Scopes(() => ({
    [SeqScope.Full]: {
        include: [User],
    }
}))
@Table(getTableResourceOptions('facilities'))
export class Facility extends Resource<Facility> {
    @Length({ min: 1, max: 255 })
    @Column('VARCHAR(255)')
    address!: string;

    @IsEmail
    @AllowNull
    @Length({ min: 3, max: 255 })
    @Column('VARCHAR(255)')
    email?: string;

    @AllowNull
    @Length({ min: 1, max: 15 })
    @Column('VARCHAR(15)')
    telephone?: string;

    @BelongsToMany(() => User, () => UserFacility)
    doctors?: User[];
}
