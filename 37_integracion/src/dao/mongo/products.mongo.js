import MyError from "../../config/MyError.js";
import Product from "./models/product.model.js";
import dictionary from "../../config/errors.js";

export default class ProductsMongo {
  constructor() {}
  create = async (data, next) => {
    try {
      let one = await Product.create(data);
      return one
    } catch (error) {
      error.from = "mongo"
      next(error)
    }
  };
  read = async (next) => {
    try {
      let all = await Product.find();
      return all
    } catch (error) {
      error.from = "mongo"
      return next(error)
    }
  };
  update = async (id, data, next) => {
    try {
      let one = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (one) {
        return {
          message: "product updated",
          response: one,
        };
      } else {
        return {
          message: "no product",
          response: null,
        };
      }
    } catch (error) {
      error.from = "mongo"
      return next(error)
    }
  };
  destroy = async (id, next) => {
    try {
      let one = await Product.findByIdAndDelete(id);
      if (one) {
        return {
          message: "product deleted",
          response: one._id,
        };
      } else {
        return {
          message: "no product",
          response: null,
        };
      }
    } catch (error) {
      error.from = "mongo"
      return next(error)
    }
  };
}
