import { Router } from "express";
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from "../middlewares/auth-middlewares.js";
import { userController } from "../controllers/user-controller.js";

const router = Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put(
  "/:id",
  authenticationMiddleware,
  authorizationMiddleware,
  userController.update
);
router.delete(
  "/:id",
  authenticationMiddleware,
  authorizationMiddleware,
  userController.delete
);
router.get("/me", authenticationMiddleware, userController.findMe);
router.get("/", authenticationMiddleware, userController.findAll);
router.get("/:id", authenticationMiddleware, userController.findById);

export default router;
