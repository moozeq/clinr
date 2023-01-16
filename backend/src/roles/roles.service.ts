import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AssociateRoleDto } from './dto/associate-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { DissolveRoleDto } from './dto/dissolve-role.dto';
import { RoleType } from './entities/role-types.entity';
import { UserRole } from './entities/role-user.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private usersService: UsersService) { }

  create(createRoleDto: CreateRoleDto) {
    return Role.create(createRoleDto);
  }

  async findAll(includeUsers: boolean = false): Promise<Role[]> {
    const includeOptions = includeUsers ? [User] : [];
    return Role.findAll({ include: includeOptions });
  }

  findOne(uuid: string, includeUsers: boolean = false): Promise<Role | undefined> {
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
        this.usersService.findOne(associateRole.userUuid),
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
        this.usersService.findOne(dissolveRole.userUuid),
        Role.findOne({ where: { uuid: dissolveRole.roleUuid } })
      ]).then(([user, role]) => {
        if (!user || !role) {
          throw new NotFoundException('Invalid user or role!');
        }
        // Forbid removing role 'doctor' from user who is assigned to any facility.
        if (role.name === RoleType.Doctor && user.facilities.length > 0) {
          throw new BadRequestException(`User is a ${role.name} assigned to facilities, role "${role.name}" can not be removed!`);
        }
        return UserRole.destroy({ where: { userId: user.id, roleId: role.id } });
      })
  }
}
