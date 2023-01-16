import { IsArray, IsUUID, Length } from "class-validator";
import { ResponseUserDto } from "src/users/dto/response-user.dto";
import { Role } from "../entities/role.entity";

export class ResponseRoleDto {
    @IsUUID()
    uuid: string;
    
    @Length(1, 31)
    name: string;

    @IsArray()
    users: ResponseUserDto[];

    constructor(uuid: string, name: string, users: ResponseUserDto[]) {
        this.uuid = uuid;
        this.name = name;
        this.users = users;
    }

    static fromRole(role: Role): ResponseRoleDto {
        const users = role.users?.map(user => ResponseUserDto.fromUser(user)) || [];
        return new ResponseRoleDto(role.uuid, role.name, users);
    }
}
