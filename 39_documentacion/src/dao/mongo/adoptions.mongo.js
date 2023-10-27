import Adoption from "./models/adoption.model.js";

export default class AdoptionsMongo {
  create = (data) => Adoption.create(data);
  get = (params) => Adoption.find(params);
  getBy = (params) => Adoption.findOne(params);
  update = (id, data) => Adoption.findByIdAndUpdate(id, { $set: data });
  delete = (id) => Adoption.findByIdAndDelete(id);
}
