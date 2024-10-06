import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import sequelize from "./utils/database.connect";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sync all models
sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Failed to sync models:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
