import { Injectable } from '@nestjs/common';
import { CreateDbFileDto } from './dto/create-db-file.dto';
import { UpdateDbFileDto } from './dto/update-db-file.dto';
import { DbFile } from './entities/db-file.entity';

@Injectable()
export class DbFilesService {
  create(createDbFileDto: CreateDbFileDto) {
    return DbFile.create(createDbFileDto)
  }

  findAll() {
    return DbFile.findAll()
  }

  findOne(uuid: string) {
    return DbFile.findOne({
      where: { uuid: uuid }
    })
  }

  update(uuid: string, updateDbFileDto: UpdateDbFileDto) {
    return DbFile.update(updateDbFileDto, {
      where: { uuid: uuid }
    })
  }

  remove(uuid: string) {
    return DbFile.destroy({
      where: { uuid: uuid }
    })
  }
}
