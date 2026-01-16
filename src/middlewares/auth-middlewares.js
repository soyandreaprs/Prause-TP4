import jwt from "jsonwebtoken";
import config from "../config/config.js";
import CustomError from "../utils/custom-error.js";

export const authenticationMiddleware = (req, res, next) => {
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

export const authorizationMiddleware = (req, res, next) => {
  try {
    const paramId = req.params.id;
    const tokenUserId = req.user.id;
    if (parseInt(paramId) !== parseInt(tokenUserId)) {
      throw new CustomError("Unauthorized", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
