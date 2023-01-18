import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(userId: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByUserId(userId);
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.uuid };
        return {
            user: ResponseUserDto.fromUser(user),
            accessToken: this.jwtService.sign(payload)
        }
    }

    async register(createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
            .then(
                (user) => { return ResponseUserDto.fromUser(user) })
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }
}
