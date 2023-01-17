import { Injectable } from '@nestjs/common';
import { DbFile } from 'src/db-files/entities/db-file.entity';
import { SeqScope } from 'src/utils';
import { CreateDbProtocolDto } from './dto/create-db-protocol.dto';
import { UpdateProtocolDto } from './dto/update-protocol.dto';
import { Protocol } from './entities/protocol.entity';

@Injectable()
export class ProtocolsService {
  async create(createDbProtocolDto: CreateDbProtocolDto) {
    return Protocol.create(createDbProtocolDto,
      { include: [DbFile] }
    );
  }

  async findAll(scope: SeqScope = SeqScope.Default) {
    return Protocol.scope(scope).findAll();
  }

  async findOne(uuid: string, scope: SeqScope = SeqScope.Default) {
    return Protocol.scope(scope).findByPk(uuid);
  }

  update(uuid: string, updateProtocolDto: UpdateProtocolDto) {
    return Protocol.update(updateProtocolDto, {
      where: { uuid: uuid }
    });
  }

  remove(uuid: string) {
    return Protocol.destroy({
      where: { uuid: uuid }
    });
  }
}
