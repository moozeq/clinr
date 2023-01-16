import { IsEmail, Length } from "class-validator";
import { CreateResourceDto } from "src/resource/dto/create-resource.dto";

export class CreateUserDto extends CreateResourceDto {
    @Length(1, 31)
    username: string;

    @Length(8, 31)
    password: string;

    @IsEmail()
    @Length(3, 255)
    email: string;
}
