import { IsEmail, Length } from "class-validator";
import { ResourceDto } from "src/resource/dto/resource.dto";
import { User } from "../entities/user.entity";

export class ResponseBasicUserDto extends ResourceDto {
    @Length(1, 31)
    username: string;

    @IsEmail()
    @Length(3, 255)
    email: string;

    constructor(uuid: string, name: string, description: string, meta: any, username: string, email: string) {
        super(uuid, name, description, meta);
        this.username = username;
        this.email = email;
    }

    static fromUser(user: User): ResponseBasicUserDto {
        return new ResponseBasicUserDto(
            user.uuid,
            user.name,
            user.description,
            user.meta,
            user.username,
            user.email
        );
    }
}