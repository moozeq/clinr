import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDbFileDto } from 'src/db-files/dto/create-db-file.dto';
import { SeqScope } from 'src/utils';
import { Response } from 'express';
import { CreateDbProtocolDto } from './dto/create-db-protocol.dto';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { ResponseProtocolDto } from './dto/response-protocol.dto';
import { UpdateProtocolDto } from './dto/update-protocol.dto';
import { ProtocolsService } from './protocols.service';

@Controller('protocols')
export class ProtocolsController {
  constructor(private readonly protocolsService: ProtocolsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createProtocolDto: CreateProtocolDto) {
    const instructionDbFileDto = CreateDbFileDto.fromFile(file, createProtocolDto);
    return this.protocolsService
      .create(CreateDbProtocolDto.fromProtocolAndDbFileDto(createProtocolDto, instructionDbFileDto))
      .then(protocol => ResponseProtocolDto.fromProtocol(protocol));
  }

  @Get()
  async findAll(@Query('includeInstruction') includeInstruction: boolean) {
    return this.protocolsService.findAll(includeInstruction ? SeqScope.Full : SeqScope.Default)
      .then((protocols) => protocols.map((protocol) => ResponseProtocolDto.fromProtocol(protocol)));
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string, @Query('includeInstruction') includeInstruction: boolean) {
    return this.protocolsService.findOne(uuid, includeInstruction ? SeqScope.Full : SeqScope.Default)
      .then((protocol) => ResponseProtocolDto.fromProtocol(protocol))
      .catch((e) => {
        throw new NotFoundException(e);
      });
  }

  @Get(':uuid/download')
  async getInstructionFileContent(@Param('uuid') uuid: string, @Res({ passthrough: true }) response: Response): Promise<StreamableFile> {
    return this.protocolsService.findOne(uuid, SeqScope.Full)
      .then((protocol) => {
        if (!protocol) {
          throw new NotFoundException('Wrong protocol!');
        }
        // TODO: We should secure filename before injecting it in the header.
        response.set({
          'Content-Type': protocol.instruction.mimeType,
          'Content-Disposition': `attachment; filename="${protocol.instruction.filename}"`
        });

        return new StreamableFile(protocol.instruction.content);
      });
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateProtocolDto: UpdateProtocolDto) {
    return this.protocolsService.update(uuid, updateProtocolDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.protocolsService.remove(uuid);
  }
}
