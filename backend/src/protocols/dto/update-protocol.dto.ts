import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateProtocolDto } from './create-protocol.dto';

export class UpdateProtocolDto extends PartialType(
    PickType(CreateProtocolDto, ['name', 'description', 'meta'] as const)
) {}
