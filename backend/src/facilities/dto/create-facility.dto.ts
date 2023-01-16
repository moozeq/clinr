import { IsOptional, Length } from "class-validator";
import { CreateResourceDto } from "src/resource/dto/create-resource.dto";

export class CreateFacilityDto extends CreateResourceDto {
    @Length(1, 255)
    address!: string;

    @IsOptional()
    @Length(3, 255)
    email?: string;

    @IsOptional()
    @Length(1, 15)
    telephone?: string;
}
