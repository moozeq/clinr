interface LoginUserDto {
    username: string;
    password: string;
}

// TODO: Change to use `User` class instead of this DTO.
interface LoggedUserDto {
    uuid: string;
    username: string;
    email: string;
    name: string;
}

class LoginUser {
    username: string;
    password: string;

    constructor(data: LoginUserDto) {
        this.username = data.username;
        this.password = data.password;
    }
}

class LoggedUser {
    uuid: string;
    username: string;
    email: string;
    name: string;

    constructor(data: LoggedUserDto) {
        this.uuid = data.uuid;
        this.username = data.username;
        this.email = data.email;
        this.name = data.name;
    }
}

export {
    LoginUserDto,
    LoggedUserDto,
    LoginUser,
    LoggedUser,
};