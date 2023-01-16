import { Length } from "class-validator";

export class CreateRoleDto {
    @Length(1, 31)
    name: string;
}
