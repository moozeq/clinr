import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import appConfig from 'config/app.config';
import authConfig from 'config/auth.config';
import databaseConfig from 'config/database.config';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { LocalStrategy } from './auth/local.strategy';
import { AssignDoctorDto } from './facilities/dto/assign-doctor.dto';
import { FacilitiesModule } from './facilities/facilities.module';
import { FacilitiesService } from './facilities/facilities.service';
import { AssociateRoleDto } from './roles/dto/associate-role.dto';
import { RolesModule } from './roles/roles.module';
import { RolesService } from './roles/roles.service';
import { RoleType } from './roles/roles.utils';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, authConfig]
    }),
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: authConfig().secret,
      signOptions: { expiresIn: authConfig().tokenExpiresIn },
    }),
    RolesModule,
    FacilitiesModule
  ],
  controllers: [AppController],
  providers: [AuthService, LocalStrategy, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {
  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private facilitiesService: FacilitiesService,
    private configService: ConfigService
  ) {
    // TODO: Add proper seeding.
    Promise.all([
      usersService.create({ name: 'Johny Lemon', description: 'Admin & Doctor', username: 'johnlem', email: 'a@a.com', password: '2137' }),
      rolesService.create({ name: RoleType.Admin, description: 'Admin with all permissions' }),
      rolesService.create({ name: RoleType.Director, description: 'Director for managing users and projects' }),
      rolesService.create({ name: RoleType.Doctor, description: 'Doctor for inputing data' }),
      facilitiesService.create({ 'name': 'The Johns Hopkins Hospital', 'description': 'Teaching hospital and biomedical research facility.', 'address': '1800 Orleans Street, Baltimore, Maryland, United States', 'email': null, 'telephone': '410-955-5000' }),
    ]).then(([user, roleAdmin, roleDirector, roleDoctor, facility]) => {
      Promise.all([
        rolesService.associate({ userUuid: user.uuid, roleUuid: roleAdmin.uuid } as AssociateRoleDto),
        rolesService.associate({ userUuid: user.uuid, roleUuid: roleDoctor.uuid } as AssociateRoleDto)
      ]).then(() => {
        facilitiesService.assignDoctor({ userUuid: user.uuid, facilityUuid: facility.uuid } as AssignDoctorDto);
      })
    })
  }
}
