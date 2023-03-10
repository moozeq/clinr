import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SeqScope } from 'src/utils';
import { AssociateRoleDto } from './dto/associate-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { DissolveRoleDto } from './dto/dissolve-role.dto';
import { Role } from './entities/role.entity';
import { RoleType } from './roles.utils';

@Injectable()
export class RolesService {
  constructor(private usersService: UsersService) { }

  create(createRoleDto: CreateRoleDto) {
    return Role.create(createRoleDto);
  }

  async findAll(scope: SeqScope = SeqScope.Default): Promise<Role[]> {
    return Role.scope(scope).findAll();
  }

  findOne(uuid: string, scope: SeqScope = SeqScope.Default): Promise<Role | undefined> {
    return Role.scope(scope).findByPk(uuid);
  }

  findByName(name: string, scope: SeqScope = SeqScope.Default): Promise<Role | undefined> {
    return Role.scope(scope).findOne({
      where: { name: name }
    });
  }

  remove(uuid: string) {
    return Role.destroy({
      where: { uuid: uuid }
    });
  }

  async associate(associateRole: AssociateRoleDto): Promise<any> {
    return Promise.all(
      [
        this.usersService.findOne(associateRole.userUuid),
        this.findOne(associateRole.roleUuid)
      ]).then(([user, role]) => {
        if (!user || !role) {
          throw new NotFoundException('Invalid user or role!');
        }
        return user.$add('role', role);
      })
  }

  async dissolve(dissolveRole: DissolveRoleDto): Promise<any> {
    return Promise.all(
      [
        this.usersService.findOne(dissolveRole.userUuid, SeqScope.Full),
        this.findOne(dissolveRole.roleUuid)
      ]).then(([user, role]) => {
        if (!user || !role) {
          throw new NotFoundException('Invalid user or role!');
        }
        // Forbid removing role 'doctor' from user who is assigned to any facility.
        if (role.name === RoleType.Doctor && user.facilities.length > 0) {
          throw new BadRequestException(`User is a ${role.name} assigned to facilities, role "${role.name}" can not be removed!`);
        }
        return user.$remove('role', role);
      })
  }
}
