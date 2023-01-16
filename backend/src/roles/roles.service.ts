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

  async findAll(includeUsers: boolean = false): Promise<Role[]> {
    const includeOptions = includeUsers ? [User] : [];
    return Role.findAll({ include: includeOptions });
  }

  findOne(uuid: string, includeUsers: boolean = false) {
    const includeOptions = includeUsers ? [User] : [];
    return Role.findOne({
      where: { uuid: uuid },
      include: includeOptions
    });
  }

  findByName(name: string, includeUsers: boolean = false): Promise<Role | undefined> {
    const includeOptions = includeUsers ? [User] : [];
    return Role.findOne({
      where: { name: name },
      include: includeOptions
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
