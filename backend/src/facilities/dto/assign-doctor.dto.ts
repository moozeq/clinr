import { IsUUID, Length } from "class-validator";

export class AssignDoctorDto {
    @IsUUID()
    userUuid: string;
    
    @IsUUID()
    facilityUuid: string;
}
