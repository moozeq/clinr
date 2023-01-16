import databaseConfig from "config/database.config";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Role, UserRole } from "src/roles/entities/role.entity";
import { User } from "src/users/entities/user.entity";

const dbConfig = databaseConfig() as SequelizeOptions;
dbConfig.models = [User, Role, UserRole];

export const sequelize = new Sequelize(dbConfig);