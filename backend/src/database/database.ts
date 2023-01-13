import { Sequelize } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "clinr",
    password: "",
    database: "postgres",
    models: [User]
})