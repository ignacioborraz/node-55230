import dao from "../dao/factory.js"
import PetDTO from "../dto/pets.dto.js";

export default class PetsRepository {
  constructor() {
    this.model = new dao.Pet()
  }
  create = (data) => {
    data = PetDTO.getPetInputFrom(data);
    return this.model.create(data)
  };
  getAll = (params) => this.model.get(params);
  getBy = (params) => this.model.getBy(params);
  update = (id, data) => this.model.update(id, data);
  delete = (id) => this.model.delete(id);
}
