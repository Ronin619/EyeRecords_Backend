import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../utils/database.connect";
import bcrypt from "bcrypt";

interface UserAttributes {
  id: number;
  userName: string;
  password: string;
  email: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/],
          msg: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one non-alphanumeric character.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: "users",
    timestamps: false,
    hooks: {
      beforeCreate: async (
        user: Model<UserAttributes, UserCreationAttributes>
      ) => {
        if (user.getDataValue("password")) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(
            user.getDataValue("password"),
            saltRounds
          );
          user.setDataValue("password", hashedPassword);
        }
      },
    },
  }
);

export default User;
