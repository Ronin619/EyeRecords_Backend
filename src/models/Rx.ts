import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../utils/database.connect";

interface RxAttributes {
  id: number;
  userId: number;
  OD: string;
  OS: string;
  prism: string;
  OC: number;
  segHt: number;
  PD: string;
}

type RxCreationAttributes = Optional<RxAttributes, "id">;

const Rx = sequelize.define<Model<RxAttributes, RxCreationAttributes>>(
  "Rx",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OS: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prism: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    segHt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    PD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "Rxes",
    timestamps: false,
  }
);
