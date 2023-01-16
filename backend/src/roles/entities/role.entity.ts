import { BelongsToMany, Scopes, Table } from "sequelize-typescript";
import { Resource } from "src/resource/entities/resource.entity";
import { getTableResourceOptions } from "src/resource/resource.utils";
import { User } from "src/users/entities/user.entity";
import { SeqScope } from "src/utils";
import { UserRole } from "./role-user.entity";

@Scopes(() => ({
    [SeqScope.Full]: {
        include: [User],
    }
}))
@Table(getTableResourceOptions('roles'))
export class Role extends Resource<Role> {
    @BelongsToMany(() => User, () => UserRole)
    users?: User[];
}