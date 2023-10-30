import Pet from "./models/pet.model.js";

export default class PetsMongo {
  create = async (data) => {
    try {
      return await Pet.create(data);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  get = async (params) => {
    try {
      return await Pet.find(params);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  getBy = async (params) => {
    try {
      return await Pet.findOne(params);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  update = async (id, data) => {
    try {
      return await Pet.findByIdAndUpdate(id, { $set: data });
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  delete = async (id) => {
    try {
      return await Pet.findByIdAndDelete(id);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
}
