import UserDTO from "../dtos/user-dto.js";
import { userService } from "../services/user-service.js";
import { generateToken } from "../utils/user-util.js";

class UserController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      const user = await this.service.register(req.body);
      res.status(201).json({
        message: "User registered successfully",
        user: new UserDTO(user),
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.login(email, password);
      const token = generateToken(user);
      res.header("Authorization", `Bearer ${token}`);
      res.status(200).json({
        message: "Login successful",
        token,
        user: new UserDTO(user),
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.service.update(parseInt(id), req.body);
      res.json({
        message: "User updated successfully",
        user: new UserDTO(user),
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.service.delete(parseInt(id));
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  findMe = async (req, res, next) => {
    try {
      const user = req.user;
      res.json({ user: new UserDTO(user) });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.service.findById(id);
      res.json({ user: new UserDTO(user) });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req, res, next) => {
    try {
      const users = await this.service.findAll();
      res.json({ users: users.map((user) => new UserDTO(user)) });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);
