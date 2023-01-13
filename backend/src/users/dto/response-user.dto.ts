import { PartialType, PickType } from "@nestjs/mapped-types";
import { User } from "../entities/user.entity";
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends PickType(CreateUserDto, ['login', 'name'] as const) {
    constructor(user: User) {
        super(user);
        this.login = user.login;
        this.name = user.name;
    }
}