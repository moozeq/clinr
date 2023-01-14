import { IsEmail, IsNotEmpty, Length} from "class-validator";

export class CreateUserDto {
    @Length(1, 31)
    username: string;

    @Length(8, 31)
    password: string;

    @IsEmail()
    @Length(3, 255)
    email: string;

    @Length(1, 63)
    name: string;
}
