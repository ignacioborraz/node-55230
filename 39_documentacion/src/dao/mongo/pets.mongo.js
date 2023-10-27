import Pet from "./models/pet.model.js";

export default class PetsMongo {
  create = (data) => Pet.create(data);
  get = (params) => Pet.find(params);
  getBy = (params) => Pet.findOne(params);
  update = (id, data) => Pet.findByIdAndUpdate(id, { $set: data });
  delete = (id) => Pet.findByIdAndDelete(id);
}
