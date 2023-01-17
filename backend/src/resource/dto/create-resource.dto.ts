import { IsOptional, Length } from "class-validator";

export class CreateResourceDto {
    @Length(1, 255)
    name!: string;

    @Length(0, 1023)
    @IsOptional()
    description?: string;

    @IsOptional()
    meta?: any;

    constructor(name: string, description: string, meta: any) {
        this.name = name;
        this.description = description;
        this.meta = meta;
    }
}
