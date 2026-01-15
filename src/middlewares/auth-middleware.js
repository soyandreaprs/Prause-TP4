import jwt from "jsonwebtoken";
import config from "../config/config.js";
import CustomError from "../utils/custom-error.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) throw new CustomError("Token inválido", 401);
    const cleanToken = token.replace("Bearer ", "");
    const payload = jwt.verify(cleanToken, config.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
