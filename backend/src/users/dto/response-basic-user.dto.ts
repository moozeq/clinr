import { IsArray, IsEmail, IsUUID, Length } from "class-validator";
import { User } from "../entities/user.entity";

export class ResponseBasicUserDto {
    @IsUUID()
    uuid: string;

    @Length(1, 31)
    username: string;

    @IsEmail()
    @Length(3, 255)
    email: string;

    @Length(1, 63)
    name: string;

    constructor(uuid: string, username: string, email: string, name: string) {
        this.uuid = uuid;
        this.username = username;
        this.email = email;
        this.name = name;
    }

    static fromUser(user: User): ResponseBasicUserDto {
        return new ResponseBasicUserDto(user.uuid, user.username, user.email, user.name);
    }
}