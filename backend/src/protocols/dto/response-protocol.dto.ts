import { ResponseDbFileDto } from "src/db-files/dto/response-db-file.dto";
import { ResourceDto } from "src/resource/dto/resource.dto";
import { Protocol } from "../entities/protocol.entity";

export class ResponseProtocolDto extends ResourceDto {
    instruction: ResponseDbFileDto;

    constructor(uuid: string, name: string, description: string, meta: any, instruction: ResponseDbFileDto) {
        super(uuid, name, description, meta);
        this.instruction = instruction;
    }

    static fromProtocol(protocol: Protocol, forceNoFileContent: boolean = false): ResponseProtocolDto {
        const instructionFile = ResponseDbFileDto.fromDbFile(protocol.instruction, forceNoFileContent);
        return new ResponseProtocolDto(protocol.uuid, protocol.name, protocol.description, protocol.meta, instructionFile);
    }
}