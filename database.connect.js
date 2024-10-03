import { Sequelize } from "sequelize";
const dbName = "eyeRecord";
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: "localhost",
    dialect: "postgres",
});
export default sequelize;
