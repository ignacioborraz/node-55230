import AdoptionsRepository from "../repository/adoptions.repository.js";

export default class AdoptionsService {
  constructor() {
    this.repository = new AdoptionsRepository()
  }
  create = (data) => this.repository.create(data);
  getAll = (params) => this.repository.getAll(params);
  getBy = (params) => this.repository.getBy(params);
  update = (id, data) => this.repository.update(id, data);
  delete = (id) => this.repository.delete(id);
}
