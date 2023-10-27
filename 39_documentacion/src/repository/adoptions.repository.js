import dao from "../dao/factory.js"

export default class AdoptionsRepository {
  constructor() {
    this.model = new dao.Adoption()
  }
  create = (data) => this.model.create(data);
  getAll = (params) => this.model.get(params);
  getBy = (params) => this.model.getBy(params);
  update = (id, data) => this.model.update(id, data);
  delete = (id) => this.model.delete(id);
}
