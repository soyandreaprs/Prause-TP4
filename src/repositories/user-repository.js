import { UserModel } from "../models/user-model.js";

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  register = async (body) => {
    return await this.model.create(body);
  };

  update = async (id, body) => {
    return await this.model.update(body, { where: { id } });
  };

  delete = async (id) => {
    return await this.model.destroy({ where: { id } });
  };

  findByEmail = async (email) => {
    return await this.model.findOne({ where: { email } });
  };

  findById = async (id) => {
    return await this.model.findByPk(id);
  };

  findAll = async () => {
    return await this.model.findAll();
  };
}

export const userRepository = new UserRepository(UserModel);
