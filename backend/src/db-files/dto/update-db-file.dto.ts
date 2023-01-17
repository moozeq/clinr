import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateDbFileDto } from './create-db-file.dto';

export class UpdateDbFileDto extends PartialType(
    PickType(CreateDbFileDto, ['name', 'description'] as const)
) {}
