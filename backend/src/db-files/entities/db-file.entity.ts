import { Column, Length, Table } from "sequelize-typescript";
import { Resource } from "src/resource/entities/resource.entity";
import { getTableResourceOptions } from "src/resource/resource.utils";

@Table(getTableResourceOptions('dbFiles', false))
export class DbFile extends Resource<DbFile> {
    @Length({ min: 1, max: 255 })
    @Column('VARCHAR(255)')
    filename!: string;

    @Column
    content!: Buffer;
}
