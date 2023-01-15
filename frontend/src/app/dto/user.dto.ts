interface LoginUserDto {
    username: string;
    password: string;
}

// TODO: Change to use `User` class instead of this DTO.
interface LoggedUserDto {
    username: string;
    email: string;
    name: string;
}

export {
    LoginUserDto,
    LoggedUserDto,
};