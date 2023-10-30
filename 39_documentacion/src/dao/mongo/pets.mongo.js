import Pet from "./models/pet.model.js";

export default class PetsMongo {
  create = async (data, next) => {
    try {
      return await Pet.create(data);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  get = async (params, next) => {
    try {
      return await Pet.find(params);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  getBy = async (params, next) => {
    try {
      return await Pet.findOne(params);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await Pet.findByIdAndUpdate(id, { $set: data });
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await Pet.findByIdAndDelete(id);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
}
