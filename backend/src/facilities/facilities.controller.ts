import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { AssignDoctorDto } from './dto/assign-doctor.dto';
import { DismissDoctorDto } from './dto/dismiss-doctor.dto';
import { ResponseFacilityDto } from './dto/response-facility.dto';
import { SeqScope } from 'src/utils';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) { }

  @Post('assign')
  associate(@Body() assignDoctor: AssignDoctorDto) {
    return this.facilitiesService.assignDoctor(assignDoctor);
  }

  @Post('dismiss')
  dissolve(@Body() dismissDoctor: DismissDoctorDto) {
    return this.facilitiesService.dismissDoctor(dismissDoctor);
  }

  @Get()
  async findAll(@Query('includeDoctors') includeDoctors: boolean) {
    return this.facilitiesService.findAll(includeDoctors ? SeqScope.Full : SeqScope.Basic)
      .then((facilities) => facilities.map(facility => ResponseFacilityDto.fromFacility(facility)));
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Query('includeDoctors') includeDoctors: boolean) {
    return this.facilitiesService.findOne(uuid, includeDoctors ? SeqScope.Full : SeqScope.Basic)
      .then((facility) => ResponseFacilityDto.fromFacility(facility));
  }
}
