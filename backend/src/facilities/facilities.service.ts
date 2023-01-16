import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoleType } from 'src/roles/entities/role-types.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SeqScope } from 'src/utils';
import { AssignDoctorDto } from './dto/assign-doctor.dto';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { DismissDoctorDto } from './dto/dismiss-doctor.dto';
import { Facility } from './entities/facility.entity';
import { UserFacility } from './entities/user-facility.entity';

@Injectable()
export class FacilitiesService {
  constructor(private usersService: UsersService) { }

  create(createFacilityDto: CreateFacilityDto) {
    return Facility.create(createFacilityDto);
  }

  findAll(scope: SeqScope = SeqScope.Basic) {
    return Facility.scope(scope).findAll();
  }

  findOne(uuid: string, scope: SeqScope = SeqScope.Basic) {
    return Facility.scope(scope).findOne({
      where: { uuid: uuid }
    });
  }

  remove(uuid: string) {
    return Facility.destroy({
      where: { uuid: uuid }
    });
  }

  async assignDoctor(assignDoctor: AssignDoctorDto): Promise<UserFacility> {
    return Promise.all(
      [
        this.usersService.findOne(assignDoctor.userUuid, SeqScope.Full),
        this.findOne(assignDoctor.facilityUuid),
      ]).then(([user, facility]) => {
        if (!user || !facility) {
          throw new NotFoundException('Invalid user or facility!');
        }
        if (!user.roles.some((role) => role.name === RoleType.Doctor)) {
          throw new BadRequestException('User should have a doctor role!');
        }
        return UserFacility.create({ userId: user.id, facilityId: facility.id });
      })
  }

  async dismissDoctor(dismissDoctor: DismissDoctorDto): Promise<number> {
    return Promise.all(
      [
        this.usersService.findOne(dismissDoctor.userUuid),
        this.findOne(dismissDoctor.facilityUuid)
      ]).then(([user, facility]) => {
        if (!user || !facility) {
          throw new NotFoundException('Invalid user or facility!');
        }
        return UserFacility.destroy({ where: { userId: user.id, facilityId: facility.id } });
      })
  }
}
