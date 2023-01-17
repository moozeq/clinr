import { Length } from "class-validator";
import { CreateResourceDto } from "src/resource/dto/create-resource.dto";

export class CreateDbFileDto extends CreateResourceDto {
    @Length(1, 255)
    filename!: string;

    @Length(1, 255)
    mimeType!: string;

    content!: Buffer;

    constructor(file: Express.Multer.File, createResourceDto: CreateResourceDto) {
        super();
        this.name = createResourceDto.name;
        this.description = createResourceDto.description;
        this.filename = file.originalname;
        this.mimeType = file.mimetype;
        this.content = file.buffer;
    }
}
