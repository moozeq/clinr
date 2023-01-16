import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
  exports: [FacilitiesService],
  imports: [UsersModule]
})
export class FacilitiesModule {}
