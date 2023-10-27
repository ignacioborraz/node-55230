import PetsRepository from "../repository/pets.repository.js";

export default class PetsService {
  constructor() {
    this.repository = new PetsRepository()
  }
  create = (data) => this.repository.create(data);
  getAll = (params) => this.repository.getAll(params);
  getBy = (params) => this.repository.getBy(params);
  update = (id, data) => this.repository.update(id, data);
  delete = (id) => this.repository.delete(id);
}
