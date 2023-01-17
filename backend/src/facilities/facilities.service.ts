import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoleType } from 'src/roles/roles.utils';
import { UsersService } from 'src/users/users.service';
import { SeqScope } from 'src/utils';
import { AssignDoctorDto } from './dto/assign-doctor.dto';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { DismissDoctorDto } from './dto/dismiss-doctor.dto';
import { Facility } from './entities/facility.entity';

@Injectable()
export class FacilitiesService {
  constructor(private usersService: UsersService) { }

  create(createFacilityDto: CreateFacilityDto) {
    return Facility.create(createFacilityDto);
  }

  findAll(scope: SeqScope = SeqScope.Default) {
    return Facility.scope(scope).findAll();
  }

  findOne(uuid: string, scope: SeqScope = SeqScope.Default) {
    return Facility.scope(scope).findByPk(uuid);
  }

  remove(uuid: string) {
    return Facility.destroy({
      where: { uuid: uuid }
    });
  }

  async assignDoctor(assignDoctor: AssignDoctorDto): Promise<any> {
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
        return facility.$add('doctors', user);
      })
  }

  async dismissDoctor(dismissDoctor: DismissDoctorDto): Promise<any> {
    return Promise.all(
      [
        this.usersService.findOne(dismissDoctor.userUuid),
        this.findOne(dismissDoctor.facilityUuid)
      ]).then(([user, facility]) => {
        if (!user || !facility) {
          throw new NotFoundException('Invalid user or facility!');
        }
        return facility.$remove('doctors', user);
      })
  }
}
