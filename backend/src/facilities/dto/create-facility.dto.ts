import { IsOptional, Length } from "class-validator";

export class CreateFacilityDto {
    @Length(1, 255)
    name: string;

    @Length(0, 1023)
    description: string;

    @Length(1, 255)
    address: string;

    @IsOptional()
    @Length(3, 255)
    email?: string;

    @IsOptional()
    @Length(1, 15)
    telephone?: string;
}
