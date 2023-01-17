import databaseConfig from "config/database.config";
import cls from 'cls-hooked';
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { DbFile } from "src/db-files/entities/db-file.entity";
import { Facility } from "src/facilities/entities/facility.entity";
import { UserFacility } from "src/facilities/entities/user-facility.entity";
import { Protocol } from "src/protocols/entities/protocol.entity";
import { UserRole } from "src/roles/entities/role-user.entity";
import { Role } from "src/roles/entities/role.entity";
import { User } from "src/users/entities/user.entity";

const dbConfig = databaseConfig() as SequelizeOptions;
dbConfig.models = [
    User,
    Role,
    UserRole,
    Facility,
    UserFacility,
    DbFile,
    Protocol,
];

// Common namespace for transations.
// https://sequelize.org/docs/v6/other-topics/transactions/#automatically-pass-transactions-to-all-queries
export const namespace = cls.createNamespace('clinr');
Sequelize.useCLS(namespace);
export const sequelize = new Sequelize(dbConfig);