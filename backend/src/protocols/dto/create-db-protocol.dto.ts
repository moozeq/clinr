import { CreateDbFileDto } from "src/db-files/dto/create-db-file.dto";
import { CreateResourceDto } from "src/resource/dto/create-resource.dto";
import { CreateProtocolDto } from "./create-protocol.dto";

export class CreateDbProtocolDto extends CreateResourceDto {
    instruction!: CreateDbFileDto | any;

    constructor(name: string, description: string, meta: any, instruction: CreateDbFileDto) {
        super(name, description, meta);
        this.instruction = instruction;
    }

    static fromProtocolAndDbFileDto(createProtocolDto: CreateProtocolDto, createDbFileDto: CreateDbFileDto) {
        return new CreateDbProtocolDto(
            createProtocolDto.name,
            createProtocolDto.description,
            createProtocolDto.meta,
            createDbFileDto
        );
    }
}
