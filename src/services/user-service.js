import CustomError from "../utils/custom-error.js";
import { compare, hash } from "bcrypt";
import { userRepository } from "../repositories/user-repository.js";

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  register = async (body) => {
    const { email, password } = body;
    const existingUser = await this.repository.findByEmail(email);
    if (existingUser) throw new CustomError("Email already registered", 400);
    const newUser = await this.repository.register({
      ...body,
      password: await hash(password, 10),
    });
    return newUser;
  };

  login = async (email, password) => {
    const existingUser = await this.repository.findByEmail(email);
    if (!existingUser) throw new CustomError("Invalid credentials", 401);
    const validPassword = await compare(password, existingUser.password);
    if (!validPassword) throw new CustomError("Invalid credentials", 401);
    return existingUser;
  };

  update = async (id, body) => {
    const user = await this.repository.findById(id);
    if (!user) throw new CustomError("User not found", 404);
    if (body.password) {
      body.password = await hash(body.password, 10);
    }
    await this.repository.update(id, body);
    const updatedUser = await this.repository.findById(id);
    return updatedUser;
  };

  delete = async (id) => {
    const user = await this.repository.findById(id);
    if (!user) throw new CustomError("User not found", 404);
    await this.repository.delete(id);
  };

  findByEmail = async (email) => {
    const user = await this.repository.findByEmail(email);
    if (!user) throw new CustomError("User not found", 404);
    return user;
  };

  findById = async (id) => {
    const user = await this.repository.findById(id);
    if (!user) throw new CustomError("User not found", 404);
    return user;
  };

  findAll = async () => {
    const users = await this.repository.findAll();
    return users;
  };
}

export const userService = new UserService(userRepository);
