import databaseConfig from "config/database.config";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Facility } from "src/facilities/entities/facility.entity";
import { UserFacility } from "src/facilities/entities/user-facility.entity";
import { UserRole } from "src/roles/entities/role-user.entity";
import { Role } from "src/roles/entities/role.entity";
import { User } from "src/users/entities/user.entity";

const dbConfig = databaseConfig() as SequelizeOptions;
dbConfig.models = [User, Role, UserRole, Facility, UserFacility];

export const sequelize = new Sequelize(dbConfig);