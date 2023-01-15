import databaseConfig from "config/database.config";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

const dbConfig = databaseConfig() as SequelizeOptions;
dbConfig.models = [User];

export const sequelize = new Sequelize(dbConfig);