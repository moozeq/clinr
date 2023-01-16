import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AssociateRoleDto } from './dto/associate-role.dto';
import { ResponseRoleDto } from './dto/response-role.dto';
import { DissolveRoleDto } from './dto/dissolve-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post('associate')
  associate(@Body() associateRole: AssociateRoleDto) {
    return this.rolesService.associate(associateRole);
  }

  @Post('dissolve')
  dissolve(@Body() dissolveRole: DissolveRoleDto) {
    return this.rolesService.dissolve(dissolveRole);
  }

  @Get()
  async find(@Query('name') name: string, @Query('includeUsers') includeUsers: boolean) {
    if (name) {
      return this.rolesService.findByName(name, includeUsers)
        .then((role) => ResponseRoleDto.fromRole(role));
    } else {
      return this.rolesService.findAll(includeUsers)
        .then((roles) => roles.map(role => ResponseRoleDto.fromRole(role)));
    }
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Query('includeUsers') includeUsers: boolean) {
    return this.rolesService.findOne(uuid, includeUsers).then((role) => ResponseRoleDto.fromRole(role));
  }
}
