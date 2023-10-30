import dao from "../dao/factory.js";
import PetDTO from "../dto/pets.dto.js";

export default class PetsRepository {
  constructor() {
    this.model = new dao.Pet();
  }
  create = async (data) => {
    try {
      data = PetDTO.getPetInputFrom(data);
      return this.model.create(data);
    } catch (error) {
      error.where = "repository";
      return error;
    }
  };
  getAll = async (params) => {
    try {
      return await this.model.get(params);
    } catch (error) {
      error.where = "repository";
      return error;
    }
  };
  getBy = async (params) => {
    try {
      return await this.model.getBy(params);
    } catch (error) {
      error.where = "repository";
      return error;
    }
  };
  update = async (id, data) => {
    try {
      return await this.model.update(id, data);
    } catch (error) {
      error.where = "repository";
      return error;
    }
  };
  delete = async (id) => {
    try {
      return await this.model.delete(id);
    } catch (error) {
      error.where = "repository";
      return error;
    }
  };
}
