import { IsUUID, Length } from "class-validator";

export class DissolveRoleDto {
    @IsUUID()
    userUuid: string;
    
    @IsUUID()
    roleUuid: string;
}
