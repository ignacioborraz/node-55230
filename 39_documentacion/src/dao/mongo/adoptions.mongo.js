import Adoption from "./models/adoption.model.js";

export default class AdoptionsMongo {
  create = async (data, next) => {
    try {
      return await Adoption.create(data);
    } catch (error) {
      return next(error);
    }
  };
  get = async (params, next) => {
    try {
      return await Adoption.find(params);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  getBy = async (params, next) => {
    try {
      return await Adoption.findOne(params);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await Adoption.findByIdAndUpdate(id, { $set: data });
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await Adoption.findByIdAndDelete(id);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
}
