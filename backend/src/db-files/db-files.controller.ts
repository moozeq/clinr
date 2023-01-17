import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DbFilesService } from './db-files.service';
import { CreateDbFileDto } from './dto/create-db-file.dto';
import { UpdateDbFileDto } from './dto/update-db-file.dto';

@Controller('db-files')
export class DbFilesController {
  constructor(private readonly dbFilesService: DbFilesService) {}

  @Post()
  create(@Body() createDbFileDto: CreateDbFileDto) {
    return this.dbFilesService.create(createDbFileDto);
  }

  @Get()
  findAll() {
    return this.dbFilesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.dbFilesService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateDbFileDto: UpdateDbFileDto) {
    return this.dbFilesService.update(uuid, updateDbFileDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.dbFilesService.remove(uuid);
  }
}
