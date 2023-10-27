import UsersRepository from "../repository/users.repository.js";

export default class UsersService {
  constructor() {
    this.repository = new UsersRepository()
  }
  create = (data) => this.repository.create(data);
  getAll = (params) => this.repository.getAll(params);
  getBy = (params) => this.repository.getBy(params);
  getUserByEmail = (email) => this.repository.getBy({ email });
  getUserById = (id) => this.repository.getBy({ _id: id });
  update = (id, data) => this.repository.update(id, data);
  delete = (id) => this.repository.delete(id);
}
