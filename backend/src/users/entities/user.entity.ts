import { BelongsToMany, Column, Index, IsEmail, Length, Scopes, Table, Unique } from "sequelize-typescript";
import { Facility } from "src/facilities/entities/facility.entity";
import { UserFacility } from "src/facilities/entities/user-facility.entity";
import { Resource } from "src/resource/entities/resource.entity";
import { getTableResourceOptions } from "src/resource/resource.utils";
import { UserRole } from "src/roles/entities/role-user.entity";
import { Role } from "src/roles/entities/role.entity";
import { SeqScope } from "src/utils";

@Scopes(() => ({
    [SeqScope.Full]: {
        include: [Role, Facility],
    }
}))
@Table(getTableResourceOptions('users'))
export class User extends Resource<User> {
    @Unique
    @Index
    @Length({ min: 1, max: 31 })
    @Column('VARCHAR(32)')
    readonly username!: string;

    @Length({ min: 60, max: 60 })
    @Column('VARCHAR(60)')
    password!: string;

    @Unique
    @Index
    @IsEmail
    @Length({ min: 3, max: 255 })
    @Column('VARCHAR(255)')
    email!: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles?: Role[];

    @BelongsToMany(() => Facility, () => UserFacility)
    facilities?: Facility[];
}