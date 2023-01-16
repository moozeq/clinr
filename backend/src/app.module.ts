import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtStrategy } from './auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import databaseConfig from 'config/database.config';
import appConfig from 'config/app.config';
import authConfig from 'config/auth.config';
import { RolesService } from './roles/roles.service';
import { AssociateRoleDto } from './roles/dto/associate-role.dto';

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
    RolesModule
  ],
  controllers: [AppController],
  providers: [AuthService, LocalStrategy, JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {
  constructor(private usersService: UsersService, private rolesService: RolesService, private configService: ConfigService) {
    // TODO: Add proper seeding.
    Promise.all([
      usersService.create({ name: 'Johny Lemon', username: 'johnlem', email: 'a@a.com', password: '2137' }),
      rolesService.create({ name: 'admin' }),
      rolesService.create({ name: 'director' }),
      rolesService.create({ name: 'doctor' }),
    ]).then(([ user, roleAdmin, roleDirector, roleDoctor ]) => {
      rolesService.associate({userUuid: user.uuid, roleUuid: roleAdmin.uuid} as AssociateRoleDto);
    })
  }
}
