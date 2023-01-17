export function getTableResourceOptions(tableName: string, paranoid: boolean = true) {
    return {
        paranoid: paranoid,
        // // It seems that sequelize automatically creates those indexes.
        // indexes: [
        //     { name: `${tableName}_uuid`, unique: true, fields: ['uuid'] },
        //     { name: `${tableName}_name`, unique: true, fields: ['name'] }
        // ]
    };
}