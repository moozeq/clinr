import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, Length} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    login: string;

    @IsNotEmpty()
    @Length(8, 31)
    password: string;

    @IsNotEmpty()
    @Length(1, 63)
    name: string;
}
