import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from "bcrypt";
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt'
import { ResponseUserDto } from 'src/users/dto/response-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.uuid };
        return {
            user: new ResponseUserDto(user),
            accessToken: this.jwtService.sign(payload)
        }
    }
}
