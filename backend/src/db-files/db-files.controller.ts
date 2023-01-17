import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CreateResourceDto } from 'src/resource/dto/create-resource.dto';
import { SeqScope } from 'src/utils';
import { DbFilesService } from './db-files.service';
import { CreateDbFileDto } from './dto/create-db-file.dto';
import { ResponseDbFileDto } from './dto/response-db-file.dto';
import { UpdateDbFileDto } from './dto/update-db-file.dto';

@Controller('db-files')
export class DbFilesController {
  constructor(private readonly dbFilesService: DbFilesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createResourceDto: CreateResourceDto) {
    const createDbFileDto = new CreateDbFileDto(file, createResourceDto);
    return this.dbFilesService.create(createDbFileDto)
      .then((file) => ResponseDbFileDto.fromDbFile(file, true));
  }

  @Get()
  async findAll() {
    return this.dbFilesService.findAll()
      .then(files => files.map((file) => ResponseDbFileDto.fromDbFile(file, true)));
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Query('includeContent') includeContent: boolean) {
    return this.dbFilesService.findOne(uuid, includeContent ? SeqScope.Full : SeqScope.Default)
      .then((file) => ResponseDbFileDto.fromDbFile(file));
  }

  @Get(':uuid/download')
  async getFileContent(@Param('uuid') uuid: string, @Res({ passthrough: true }) response: Response): Promise<StreamableFile> {
    return this.dbFilesService.findOne(uuid, SeqScope.Full)
      .then((file) => {
        if (!file) {
          throw new NotFoundException('Wrong file!')
        }
        // TODO: We should secure filename before injecting it in the header.
        response.set({
          'Content-Type': file.mimeType,
          'Content-Disposition': `attachment; filename="${file.filename}"`
        })

        return new StreamableFile(file.content);
      });
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
