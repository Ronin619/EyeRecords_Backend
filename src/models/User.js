var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DataTypes } from "sequelize";
import sequelize from "../../utils/database.connect";
import bcrypt from "bcrypt";
const User = sequelize.define("User", {
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
}, {
    tableName: "users",
    timestamps: false,
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.getDataValue("password")) {
                const saltRounds = 10;
                const hashedPassword = yield bcrypt.hash(user.getDataValue("password"), saltRounds);
                user.setDataValue("password", hashedPassword);
            }
        }),
    },
});
export default User;
