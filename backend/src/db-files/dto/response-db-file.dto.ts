import { Length } from "class-validator";
import { ResourceDto } from "src/resource/dto/resource.dto";
import { DbFile } from "../entities/db-file.entity";

export class ResponseDbFileDto extends ResourceDto {
    @Length(1, 255)
    filename!: string;

    @Length(1, 255)
    mimeType?: string;

    content?: Buffer;

    constructor(uuid: string, name: string, description: string, filename: string, mimeType: string, content: Buffer) {
        super(uuid, name, description);
        this.filename = filename;
        this.mimeType = mimeType;
        this.content = content;
    }

    static fromDbFile(dbFile: DbFile, forceNoContent: boolean = false): ResponseDbFileDto {
        const fileContent = forceNoContent ? undefined : dbFile.content;
        return new ResponseDbFileDto(dbFile.uuid, dbFile.name, dbFile.description, dbFile.filename, dbFile.mimeType, fileContent);
    }
}