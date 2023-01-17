import { Module } from '@nestjs/common';
import { DbFilesService } from './db-files.service';
import { DbFilesController } from './db-files.controller';

@Module({
  controllers: [DbFilesController],
  providers: [DbFilesService],
  exports: [DbFilesService]
})
export class DbFilesModule {}
