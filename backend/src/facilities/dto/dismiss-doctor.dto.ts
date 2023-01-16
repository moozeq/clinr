import { IsUUID } from "class-validator";

export class DismissDoctorDto {
    @IsUUID()
    userUuid: string;
    
    @IsUUID()
    facilityUuid: string;
}
