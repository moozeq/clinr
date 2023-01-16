import { IsOptional, IsUUID, Length } from "class-validator";

export class ResourceDto {
    @IsUUID()
    uuid: string;

    @Length(1, 255)
    name: string;

    @Length(0, 1023)
    @IsOptional()
    description: string;

    constructor(uuid: string, name: string, description: string) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
    }
}
