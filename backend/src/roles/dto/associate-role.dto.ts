import { IsUUID } from "class-validator";

export class AssociateRoleDto {
    @IsUUID()
    userUuid: string;
    
    @IsUUID()
    roleUuid: string;
}
