import databaseConfig from "config/database.config";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

// @ts-ignore
const dbConfig: SequelizeOptions = databaseConfig();
dbConfig.models = [User];

export const sequelize = new Sequelize(dbConfig);