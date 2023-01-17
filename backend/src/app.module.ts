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
import { DbFilesModule } from './db-files/db-files.module';
import { DbFilesService } from './db-files/db-files.service';

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
    FacilitiesModule,
    DbFilesModule
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
    private dbFilesService: DbFilesService
  ) {
    // TODO: Add proper seeding.
    Promise.all([
      usersService.create({ name: 'Johny Lemon', description: 'Admin & Doctor', username: 'johnlem', email: 'a@a.com', password: '2137' }),
      rolesService.create({ name: RoleType.Admin, description: 'Admin with all permissions' }),
      rolesService.create({ name: RoleType.Director, description: 'Director for managing users and projects' }),
      rolesService.create({ name: RoleType.Doctor, description: 'Doctor for inputing data' }),
      facilitiesService.create({ 'name': 'The Johns Hopkins Hospital', 'description': 'Teaching hospital and biomedical research facility.', 'address': '1800 Orleans Street, Baltimore, Maryland, United States', 'email': null, 'telephone': '410-955-5000' }),
      dbFilesService.create({ name: 'mRNA vaccine protocol', mimeType: 'application/pdf', description: 'Protocol instruction for mRNA vaccine', filename: 'mrna-instruction.pdf', 'content': Buffer.from('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IDEgMCBSIC9LIDIgID4+CmVuZG9iagoyIDAgb2JqCjw8IC9UeXBlIC9QYWdlcyAvTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XSAvQ291bnQgMSAvS2lkcyBbIDEgMCBSIF0gPj4KZW5kb2JqCjE0IDAgb2JqCjw8IC9UeXBlIC9DYXRhbG9nIC9QYWdlcyAyIDAgUiAvTWFya0luZm8gPDwgL01hcmtlZCB0cnVlID4+IC9TdHJ1Y3RUcmVlUm9vdAoxMSAwIFIgPj4KZW5kb2JqCjggMCBvYmoKWyAxIDAgUiAgL1hZWiAwIDg0MS44OSAwIF0KZW5kb2JqCjYgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1RydWVUeXBlIC9CYXNlRm9udCAvQUFBQUFCK0hlbHZldGljYU5ldWUgL0ZvbnREZXNjcmlwdG9yCjE1IDAgUiAvRW5jb2RpbmcgL01hY1JvbWFuRW5jb2RpbmcgL0ZpcnN0Q2hhciAzMiAvTGFzdENoYXIgMTE5IC9XaWR0aHMgWyAyNzgKMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAyNzggMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNjQ4IDAgMAowIDAgMCAwIDcyMiAwIDAgMCAwIDAgNzIyIDAgMCAwIDY4NSAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgNTM3IDU5MyA1MzcKNTkzIDUzNyAwIDAgNTU2IDIyMiAwIDAgMjIyIDg1MyA1NTYgNTc0IDU5MyAwIDMzMyA1MDAgMzE1IDU1NiA1MDAgNzU4IF0gPj4KZW5kb2JqCjE1IDAgb2JqCjw8IC9UeXBlIC9Gb250RGVzY3JpcHRvciAvRm9udE5hbWUgL0FBQUFBQitIZWx2ZXRpY2FOZXVlIC9GbGFncyAzMiAvRm9udEJCb3gKWy05NTEgLTQ4MSAxOTg3IDEwNzddIC9JdGFsaWNBbmdsZSAwIC9Bc2NlbnQgOTUyIC9EZXNjZW50IC0yMTMgL0NhcEhlaWdodAo3MTQgL1N0ZW1WIDk1IC9MZWFkaW5nIDI4IC9YSGVpZ2h0IDUxNyAvU3RlbUggODAgL0F2Z1dpZHRoIDQ0NyAvTWF4V2lkdGggMjIyNQovRm9udEZp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aOiR66nTTI2q9VE1yl5sfWbd3VvjwsvN58KLzYvCe2Q4Y/sVnXG1XSviTAjNTeVTqVSPE2N0xDtlkLfOHj564/3G5LxRzI/mrhv416M/6K6nmQplbmRzdHJlYW0KZW5kb2JqCjIwIDAgb2JqCjw8IC9UaXRsZSAobXJuYS1pbnN0cnVjdGlvbikgL1Byb2R1Y2VyIChtYWNPUyBWZXJzaW9uIDEzLjEgXChCdWlsZCAyMkM2NVwpIFF1YXJ0eiBQREZDb250ZXh0KQovQ3JlYXRvciAoUGFnZXMpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyMzAxMTcwMDE4MjJaMDAnMDAnKSAvTW9kRGF0ZSAoRDoyMDIzMDExNzAwMTgyMlowMCcwMCcpCj4+CmVuZG9iagp4cmVmCjAgMjEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzc1IDAwMDAwIG4gCjAwMDAwMDM2MjMgMDAwMDAgbiAKMDAwMDAwMDAyMiAwMDAwMCBuIAowMDAwMDAwNDg1IDAwMDAwIG4gCjAwMDAwMDMzMDUgMDAwMDAgbiAKMDAwMDAwMzg1NiAwMDAwMCBuIAowMDAwMDA4MzQwIDAwMDAwIG4gCjAwMDAwMDM4MTQgMDAwMDAgbiAKMDAwMDAwMDU5MyAwMDAwMCBuIAowMDAwMDAzMzk0IDAwMDAwIG4gCjAwMDAwMDMzNDAgMDAwMDAgbiAKMDAwMDAwMzQ3OSAwMDAwMCBuIAowMDAwMDAzNTUxIDAwMDAwIG4gCjAwMDAwMDM3MTIgMDAwMDAgbiAKMDAwMDAwNDI1NSAwMDAwMCBuIAowMDAwMDA0NTIxIDAwMDAwIG4gCjAwMDAwMDg4MDMgMDAwMDAgbiAKMDAwMDAwODUwOCAwMDAwMCBuIAowMDAwMDA5MDY4IDAwMDAwIG4gCjAwMDAwMTAwMDAgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSAyMSAvUm9vdCAxNCAwIFIgL0luZm8gMjAgMCBSIC9JRCBbIDwwZjA3MjYxNDIxZTUxYjVmNWM4NjIwMDliZGYxYjRjZT4KPDBmMDcyNjE0MjFlNTFiNWY1Yzg2MjAwOWJkZjFiNGNlPiBdID4+CnN0YXJ0eHJlZgoxMDIwNQolJUVPRgo=', 'base64') }),
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
