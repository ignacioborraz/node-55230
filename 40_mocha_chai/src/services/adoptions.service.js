import AdoptionsRepository from "../repository/adoptions.repository.js";

export default class AdoptionsService {
  constructor() {
    this.repository = new AdoptionsRepository();
  }
  create = async (data, next) => {
    try {
      return await this.repository.create(data, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  getAll = async (params, next) => {
    try {
      return await this.repository.getAll(params, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  getBy = async (params, next) => {
    try {
      return await this.repository.getBy(params, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await this.repository.update(id, data, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await this.repository.delete(id, next);
    } catch (error) {
      error.where = "service";
      return next(error);
    }
  };
}
