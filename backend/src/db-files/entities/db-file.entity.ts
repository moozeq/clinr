import { Column, Length, Scopes, Table } from "sequelize-typescript";
import { Resource } from "src/resource/entities/resource.entity";
import { getTableResourceOptions } from "src/resource/resource.utils";
import { SeqScope } from "src/utils";

@Scopes(() => ({
    [SeqScope.Default]: {
        attributes: { exclude: ['content'] }
    },
    [SeqScope.Full]: {
        attributes: { include: ['content'] }
    }
}))
@Table(getTableResourceOptions('dbFiles', false))
export class DbFile extends Resource<DbFile> {
    @Length({ min: 1, max: 255 })
    @Column('VARCHAR(255)')
    filename!: string;

    @Length({ min: 1, max: 255 })
    @Column('VARCHAR(255)')
    mimeType!: string;

    @Column
    content!: Buffer;
}
