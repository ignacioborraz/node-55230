import dao from "../dao/factory.js";
import PetDTO from "../dto/pets.dto.js";

export default class PetsRepository {
  constructor() {
    this.model = new dao.Pet();
  }
  create = async (data, next) => {
    try {
      data = PetDTO.getPetInputFrom(data);
      return this.model.create(data, next);
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
