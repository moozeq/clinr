import { Injectable } from '@nestjs/common';
import { SeqScope } from 'src/utils';
import { CreateDbFileDto } from './dto/create-db-file.dto';
import { UpdateDbFileDto } from './dto/update-db-file.dto';
import { DbFile } from './entities/db-file.entity';

@Injectable()
export class DbFilesService {
  create(createDbFileDto: CreateDbFileDto) {
    return DbFile.create(createDbFileDto)
  }

  findAll(scope: SeqScope = SeqScope.Default) {
    return DbFile.scope(scope).findAll()
  }

  findOne(uuid: string, scope: SeqScope = SeqScope.Default) {
    return DbFile.scope(scope).findOne({
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
