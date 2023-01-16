import { IsArray, IsEmail, IsUUID, Length } from "class-validator";
import { User } from "../entities/user.entity";
import { ResponseBasicUserDto } from "./response-basic-user.dto";

export class ResponseUserDto extends ResponseBasicUserDto {
    @IsArray()
    roles: string[];

    @IsArray()
    facilities: string[];

    constructor(uuid: string, username: string, email: string, name: string, roles: string[], facilities: string[]) {
        super(uuid, username, email, name);
        this.roles = roles;
        this.facilities = facilities;
    }

    static fromUser(user: User): ResponseUserDto {
        const roles = user.roles?.map(role => role.name) || [];
        const facilities = user.facilities?.map(facility => facility.name) || [];
        return new ResponseUserDto(user.uuid, user.username, user.email, user.name, roles, facilities);
    }
}