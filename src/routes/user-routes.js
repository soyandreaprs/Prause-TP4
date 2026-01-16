import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { userController } from "../controllers/user-controller.js";

const router = Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/:id", authMiddleware, userController.update);
router.delete("/:id", authMiddleware, userController.delete);
router.get("/me", authMiddleware, userController.findMe);
router.get("/", authMiddleware, userController.findAll);
router.get("/:id", authMiddleware, userController.findById);

export default router;