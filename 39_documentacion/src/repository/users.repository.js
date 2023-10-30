import dao from "../dao/factory.js";
import UserDTO from "../dto/users.dto.js";

export default class UsersRepository {
  constructor() {
    this.model = new dao.User();
  }
  create = async (data, next) => {
    try {
      data = await UserDTO.getUserInputFrom(data, next);
      return this.model.create(data);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getAll = async (params, next) => {
    try {
      return this.model.get(params, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getBy = async (params, next) => {
    try {
      return this.model.getBy(params, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getUserByEmail = async (email, next) => {
    try {
      return this.model.getBy({ email }, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getUserById = async (id, next) => {
    try {
      return this.model.getBy({ _id: id }, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return this.model.update(id, data, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return this.model.delete(id, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
}
