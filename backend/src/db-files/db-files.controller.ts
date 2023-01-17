import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResourceDto } from 'src/resource/dto/create-resource.dto';
import { DbFilesService } from './db-files.service';
import { CreateDbFileDto } from './dto/create-db-file.dto';
import { UpdateDbFileDto } from './dto/update-db-file.dto';

@Controller('db-files')
export class DbFilesController {
  constructor(private readonly dbFilesService: DbFilesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body() createResourceDto: CreateResourceDto) {
    const createDbFileDto = new CreateDbFileDto(file, createResourceDto);
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
