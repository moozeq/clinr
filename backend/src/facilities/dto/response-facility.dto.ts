import { IsArray, IsOptional, Length } from "class-validator";
import { ResourceDto } from "src/resource/dto/resource.dto";
import { ResponseBasicUserDto } from "src/users/dto/response-basic-user.dto";
import { Facility } from "../entities/facility.entity";

export class ResponseFacilityDto extends ResourceDto {
    @Length(1, 1023)
    address!: string;

    @IsOptional()
    @Length(3, 255)
    email?: string;

    @IsOptional()
    @Length(1, 15)
    telephone?: string;

    @IsArray()
    doctors?: ResponseBasicUserDto[];

    constructor(uuid: string, name: string, description: string, address: string, email: string, telephone: string, doctors: ResponseBasicUserDto[]) {
        super(uuid, name, description);
        this.address = address;
        this.email = email;
        this.telephone = telephone;
        this.doctors = doctors;
    }

    static fromFacility(facility: Facility): ResponseFacilityDto {
        const doctors = facility.doctors?.map(doctor => ResponseBasicUserDto.fromUser(doctor)) || [];
        return new ResponseFacilityDto(
            facility.uuid,
            facility.name,
            facility.description,
            facility.address,
            facility.email,
            facility.telephone,
            doctors
        );
    }
}
