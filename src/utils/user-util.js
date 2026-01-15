import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, config.SECRET_KEY, { expiresIn: "15m" });
};
