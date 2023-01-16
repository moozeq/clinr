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

  create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = this.hashPassword(createUserDto.password);
    return User.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return User.findAll({ include: 'roles' });
  }

  findOne(uuid: string): Promise<User | undefined> {
    return User.findOne({
      where: { uuid: uuid }
    });
  }

  findByUsername(username: string): Promise<User | undefined> {
    return User.findOne({
      where: { username: username }
    });
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password !== undefined) {
      updateUserDto.password = this.hashPassword(updateUserDto.password);
    }
    
    return User.update(updateUserDto, {
      where: { uuid: uuid }
    });
  }

  remove(uuid: string) {
    return User.destroy({
      where: { uuid: uuid }
    });
  }
}
