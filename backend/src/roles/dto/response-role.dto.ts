import { IsArray, IsUUID, Length } from "class-validator";
import { ResponseBasicUserDto } from "src/users/dto/response-basic-user.dto";
import { Role } from "../entities/role.entity";

export class ResponseRoleDto {
    @IsUUID()
    uuid: string;
    
    @Length(1, 31)
    name: string;

    @IsArray()
    users: ResponseBasicUserDto[];

    constructor(uuid: string, name: string, users: ResponseBasicUserDto[]) {
        this.uuid = uuid;
        this.name = name;
        this.users = users;
    }

    static fromRole(role: Role): ResponseRoleDto {
        const users = role.users?.map(user => ResponseBasicUserDto.fromUser(user)) || [];
        return new ResponseRoleDto(role.uuid, role.name, users);
    }
}
