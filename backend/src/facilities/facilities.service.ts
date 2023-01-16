import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoleType } from 'src/roles/entities/role-types.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
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

  findAll(includeDoctors: boolean = false) {
    const includeOptions = includeDoctors ? [User] : [];
    return Facility.findAll({ include: includeOptions });
  }

  findOne(uuid: string, includeDoctors: boolean = false) {
    const includeOptions = includeDoctors ? [User] : [];
    return Facility.findOne({
      where: { uuid: uuid },
      include: includeOptions
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
        this.usersService.findOne(assignDoctor.userUuid),
        Facility.findOne({ where: { uuid: assignDoctor.facilityUuid } }),
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
        Facility.findOne({ where: { uuid: dismissDoctor.facilityUuid } })
      ]).then(([user, facility]) => {
        if (!user || !facility) {
          throw new NotFoundException('Invalid user or facility!');
        }
        return UserFacility.destroy({ where: { userId: user.id, facilityId: facility.id } });
      })
  }
}
