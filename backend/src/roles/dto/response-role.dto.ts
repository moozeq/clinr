import { IsArray } from "class-validator";
import { ResourceDto } from "src/resource/dto/resource.dto";
import { ResponseBasicUserDto } from "src/users/dto/response-basic-user.dto";
import { Role } from "../entities/role.entity";

export class ResponseRoleDto extends ResourceDto {
    @IsArray()
    users: ResponseBasicUserDto[];

    constructor(uuid: string, name: string, description: string, users: ResponseBasicUserDto[]) {
        super(uuid, name, description)
        this.users = users;
    }

    static fromRole(role: Role): ResponseRoleDto {
        const users = role.users?.map(user => ResponseBasicUserDto.fromUser(user)) || [];
        return new ResponseRoleDto(role.uuid, role.name, role.description, users);
    }
}
