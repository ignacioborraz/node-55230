import dao from "../dao/factory.js";

export default class AdoptionsRepository {
  constructor() {
    this.model = new dao.Adoption();
  }
  create = async (data, next) => {
    try {
      return await this.model.create(data, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getAll = async (params, next) => {
    try {
      return await this.model.get(params, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  getBy = async (params, next) => {
    try {
      return await this.model.getBy(params, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await this.model.update(id, data, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await this.model.delete(id, next);
    } catch (error) {
      error.where = "repository";
      return next(error);
    }
  };
}
