import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = this.hashPassword(createUserDto.password);
    return User.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return User.findAll();
  }

  findOne(id: number): Promise<User> {
    return User.findOne({
      where: { id: id }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return User.update(updateUserDto, {
      where: { id: id }
    });
  }

  remove(id: number) {
    return User.destroy({
      where: { id: id }
    });
  }
}
