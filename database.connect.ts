import { Sequelize } from "sequelize";

const dbName = "eyeRecord";
const dbUsername = process.env.DB_USERNAME!;
const dbPassword = process.env.DB_PASSWORD!;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
