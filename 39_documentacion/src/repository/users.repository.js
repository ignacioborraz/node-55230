import dao from "../dao/factory.js"

export default class PetsRepository {
  constructor() {
    this.model = new dao.Pet()
  }
  create = (data) => this.model.create(data);
  getAll = (params) => this.model.get(params);
  getBy = (params) => this.model.getBy(params);
  getUserByEmail = (email) => this.model.getBy({ email });
  getUserById = (id) => this.model.getBy({ _id: id });
  update = (id, data) => this.model.update(id, data);
  delete = (id) => this.model.delete(id);
}
