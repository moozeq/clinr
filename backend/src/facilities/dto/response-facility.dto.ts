import { IsArray, IsOptional, IsUUID, Length } from "class-validator";
import { ResponseBasicUserDto } from "src/users/dto/response-basic-user.dto";
import { Facility } from "../entities/facility.entity";

export class ResponseFacilityDto {
    @IsUUID()
    uuid: string;
    
    @Length(1, 255)
    name: string;
    
    @Length(0, 1023)
    description: string;
    
    @Length(1, 1023)
    address: string;

    @IsOptional()
    @Length(3, 255)
    email?: string;

    @IsOptional()
    @Length(1, 15)
    telephone?: string;

    @IsArray()
    doctors: ResponseBasicUserDto[];

    constructor(uuid: string, name: string, description: string, address: string, email: string, telephone: string, doctors: ResponseBasicUserDto[]) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
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
