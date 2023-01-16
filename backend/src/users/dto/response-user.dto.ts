import { IsArray, IsEmail, IsUUID, Length } from "class-validator";
import { User } from "../entities/user.entity";

export class ResponseUserDto {
    @IsUUID()
    uuid: string;

    @Length(1, 31)
    username: string;

    @IsEmail()
    @Length(3, 255)
    email: string;

    @Length(1, 63)
    name: string;

    @IsArray()
    roles: string[];

    constructor(uuid: string, username: string, email: string, name: string, roles: string[]) {
        this.uuid = uuid;
        this.username = username;
        this.email = email;
        this.name = name;
        this.roles = roles;
    }

    static fromUser(user: User): ResponseUserDto {
        const roles = user.roles?.map(role => role.name) || [];
        return new ResponseUserDto(user.uuid, user.username, user.email, user.name, roles);
    }
}