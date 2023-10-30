import User from "./models/user.model.js";

export default class UsersMongo {
  create = async (data) => {
    try {
      return await User.create(data);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  get = async (params) => {
    try {
      return await User.find(params).select("-password");
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  getBy = async (params) => {
    try {
      return await User.findOne(params);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  update = async (id, data) => {
    try {
      return await User.findByIdAndUpdate(id, { $set: data });
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
  delete = async (id) => {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      error.where = "dao";
      return error;
    }
  };
}
