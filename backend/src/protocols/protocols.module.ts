import { Module } from '@nestjs/common';
import { DbFilesModule } from 'src/db-files/db-files.module';
import { ProtocolsController } from './protocols.controller';
import { ProtocolsService } from './protocols.service';

@Module({
  controllers: [ProtocolsController],
  providers: [ProtocolsService],
  imports: [DbFilesModule],
  exports: [ProtocolsService],
})
export class ProtocolsModule { }
