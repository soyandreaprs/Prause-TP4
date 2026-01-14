import { database } from "../config/database.js";
import { DataTypes } from "sequelize";

export const UserModel = database.define(
  "users",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);
