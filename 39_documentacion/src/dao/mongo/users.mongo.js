import User from "./models/user.model.js";

export default class UsersMongo {
  create = (data) => User.create(data);
  get = (params) => User.find(params);
  getBy = (params) => User.findOne(params);
  update = (id, data) => User.findByIdAndUpdate(id, { $set: data });
  delete = (id) => User.findByIdAndDelete(id);
}
