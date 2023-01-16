import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AssociateRoleDto } from './dto/associate-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { DissolveRoleDto } from './dto/dissolve-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
import { Role, UserRole } from './entities/role.entity';

@Injectable()
export class RolesService {
  create(createRoleDto: CreateRoleDto) {
    return Role.create(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return Role.findAll();
  }

  async findAllWithUsers(): Promise<Role[]> {
    return Role.findAll({ include: [User] });
  }

  findOne(uuid: string) {
    return Role.findOne({
      where: { uuid: uuid }
    });
  }

  findByName(name: string): Promise<Role | undefined> {
    return Role.findOne({
      where: { name: name }
    });
  }

  remove(uuid: string) {
    return Role.destroy({
      where: { uuid: uuid }
    });
  }

  async associate(associateRole: AssociateRoleDto): Promise<UserRole> {
    return Promise.all(
      [
        User.findOne({ where: { uuid: associateRole.userUuid } }),
        Role.findOne({ where: { uuid: associateRole.roleUuid } })
      ]).then(([user, role]) => {
        if (!user || !role) {
          throw new NotFoundException('Invalid user or role!');
        }
        return UserRole.create({ userId: user.id, roleId: role.id });
      })
  }

  async dissolve(dissolveRole: DissolveRoleDto): Promise<number> {
    return Promise.all(
      [
        User.findOne({ where: { uuid: dissolveRole.userUuid } }),
        Role.findOne({ where: { uuid: dissolveRole.roleUuid } })
      ]).then(([user, role]) => {
        if (!user || !role) {
          throw new NotFoundException('Invalid user or role!');
        }
        return UserRole.destroy({ where: { userId: user.id, roleId: role.id } });
      })
  }
}
