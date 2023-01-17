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
import { DbFilesModule } from './db-files/db-files.module';
import { DbFilesService } from './db-files/db-files.service';
import { FacilitiesModule } from './facilities/facilities.module';
import { FacilitiesService } from './facilities/facilities.service';
import { ProtocolsModule } from './protocols/protocols.module';
import { ProtocolsService } from './protocols/protocols.service';
import { RolesModule } from './roles/roles.module';
import { RolesService } from './roles/roles.service';
import { ADMIN_ROLE, ADMIN_USER, DIR_ROLE, DOC_ROLE, FACILITY, PROTOCOL, REPORT_DB_FILE } from './seed';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
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
    UsersModule,
    RolesModule,
    FacilitiesModule,
    DbFilesModule,
    ProtocolsModule,
  ],
  controllers: [AppController],
  providers: [AuthService, LocalStrategy, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private facilitiesService: FacilitiesService,
    private dbFilesService: DbFilesService,
    private protocolsService: ProtocolsService
  ) {
    // TODO: Add proper seeding.
    Promise.all([
      usersService.create(ADMIN_USER),
      rolesService.create(ADMIN_ROLE),
      rolesService.create(DIR_ROLE),
      rolesService.create(DOC_ROLE),
      facilitiesService.create(FACILITY),
      dbFilesService.create(REPORT_DB_FILE),
      protocolsService.create(PROTOCOL),
    ]).then(([user, roleAdmin, roleDirector, roleDoctor, facility, protocol]) => {
      Promise.all([
        rolesService.associate({ userUuid: user.uuid, roleUuid: roleAdmin.uuid }),
        rolesService.associate({ userUuid: user.uuid, roleUuid: roleDirector.uuid }),
        rolesService.associate({ userUuid: user.uuid, roleUuid: roleDoctor.uuid })
      ]).then(() => {
        facilitiesService.assignDoctor({ userUuid: user.uuid, facilityUuid: facility.uuid });
      })

      // // All associations from above can also be written directly:
      // user.$set('roles', [roleAdmin, roleDirector, roleDoctor]);
      // facility.$add('doctors', user);
    })
  }
}
