import Product from "./models/product.model.js";

export default class ProductsMongo {
  create = async (data, next) => {
    try {
      let one = await Product.creaste(data);
      console.log("mongo", one);
      return one;
    } catch (error) {
      error.from = "mongo";
      return next(error);
    }
  };
  read = async (next) => {
    try {
      let all = await Product.find();
      return all;
    } catch (error) {
      error.from = "mongo";
      return next(error);
    }
  };
  update = async (id, data, next) => {
    try {
      let one = await Product.findByIdAndUpdate(id, data, { new: true });
      return one;
    } catch (error) {
      error.from = "mongo";
      return next(error);
    }
  };
  destroy = async (id, next) => {
    try {
      let one = await Product.findByIdAndDelete(id);
      return one;
    } catch (error) {
      error.from = "mongo";
      return next(error);
    }
  };
}
