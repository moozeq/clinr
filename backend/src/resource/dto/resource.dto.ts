import { IsOptional, IsUUID, Length } from "class-validator";

export class ResourceDto {
    @IsUUID()
    uuid!: string;

    @Length(1, 255)
    name!: string;

    @Length(0, 1023)
    @IsOptional()
    description?: string;

    @IsOptional()
    meta?: any;

    constructor(uuid: string, name: string, description: string, meta: any) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.meta = meta;
    }
}
