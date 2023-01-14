import { PartialType, PickType } from "@nestjs/mapped-types";
import { User } from "../entities/user.entity";
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends PickType(CreateUserDto, ['username', 'name', 'email'] as const) {
    constructor(user: User) {
        super(user);
        this.username = user.username;
        this.name = user.name;
    }
}