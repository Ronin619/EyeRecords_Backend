import { DataTypes } from "sequelize";
import sequelize from "../../utils/database.connect";
const Rx = sequelize.define("Rx", {
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
}, {
    tableName: "Rxes",
    timestamps: false,
});
