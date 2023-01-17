import { BelongsTo, Column, ForeignKey, Scopes, Table } from "sequelize-typescript";
import { DbFile } from "src/db-files/entities/db-file.entity";
import { Resource } from "src/resource/entities/resource.entity";
import { getTableResourceOptions } from "src/resource/resource.utils";
import { SeqScope } from "src/utils";

@Scopes(() => ({
    [SeqScope.Full]: {
        include: [DbFile.scope(SeqScope.Full)],
    }
}))
@Table(getTableResourceOptions('protocols'))
export class Protocol extends Resource<Protocol> {
    @ForeignKey(() => DbFile)
    @Column
    instructionFileUuid: string;

    @BelongsTo(() => DbFile)
    instruction: DbFile;
}
