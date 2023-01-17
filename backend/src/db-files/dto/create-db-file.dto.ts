import { Length } from "class-validator";
import { CreateResourceDto } from "src/resource/dto/create-resource.dto";

export class CreateDbFileDto extends CreateResourceDto {
    @Length(1, 255)
    filename!: string;

    @Length(1, 255)
    mimeType!: string;

    content!: Buffer;

    constructor(name: string, description: string, meta: any, filename: string, mimeType: string, content: Buffer) {
        super(name, description, meta);
        this.filename = filename;
        this.mimeType = mimeType;
        this.content = content;
    }

    static fromFile(file: Express.Multer.File, createResourceDto: CreateResourceDto) {
        return new CreateDbFileDto(
            createResourceDto.name,
            createResourceDto.description,
            createResourceDto.meta,
            file.originalname,
            file.mimetype,
            file.buffer,
        );
    }
}
