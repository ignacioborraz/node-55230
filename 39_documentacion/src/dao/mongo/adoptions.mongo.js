import Adoption from "./models/adoption.model.js";

export default class AdoptionsMongo {
  create = async (data) => {
    try {
      return await Adoption.create(data);
    } catch (error) {
      return error;
    }
  };
  get = async (params) => {
    try {
      return await Adoption.find(params);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  getBy = async (params) => {
    try {
      return await Adoption.findOne(params);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  update = async (id, data) => {
    try {
      return await Adoption.findByIdAndUpdate(id, { $set: data });
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  delete = async (id) => {
    try {
      return await Adoption.findByIdAndDelete(id);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
}
