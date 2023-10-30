import User from "./models/user.model.js";

export default class UsersMongo {
  create = async (data, next) => {
    try {
      return await User.create(data);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  get = async (params, next) => {
    try {
      return await User.find(params).select("-password");
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  getBy = async (params, next) => {
    try {
      return await User.findOne(params);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      return await User.findByIdAndUpdate(id, { $set: data });
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
  delete = async (id, next) => {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      error.where = "dao";
      return next(error);
    }
  };
}
