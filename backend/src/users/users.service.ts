import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import bcrypt from "bcrypt";
import { SeqScope } from 'src/utils';
import { Op } from 'sequelize';

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

  async findAll(scope: SeqScope = SeqScope.Default): Promise<User[]> {
    return User.scope(scope).findAll();
  }

  async findOne(uuid: string, scope: SeqScope = SeqScope.Default): Promise<User | undefined> {
    return User.scope(scope).findByPk(uuid);
  }

  async findByUsername(username: string, scope: SeqScope = SeqScope.Default): Promise<User | undefined> {
    return User.scope(scope).findOne({
      where: { username: username }
    });
  }

  /**
   * Search for user by its ID (username or email address).
   * 
   * @param userId Username or email address
   * @param scope Scope for the search
   * @returns User promise
   */
  async findByUserId(userId: string, scope: SeqScope = SeqScope.Default): Promise<User | undefined> {
    return User.scope(scope).findOne({
      where: {
        [Op.or]: [
          { username: userId },
          { email: userId }
        ]
      }
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password !== undefined) {
      updateUserDto.password = this.hashPassword(updateUserDto.password);
    }
    
    return User.update(updateUserDto, {
      where: { uuid: uuid }
    });
  }

  async remove(uuid: string) {
    return User.destroy({
      where: { uuid: uuid }
    });
  }
}
