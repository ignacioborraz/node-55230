import Product from "./models/product.model.js";

export default class ProductsMongo {
  constructor() {}
  create = async (data) => {
    try {
      let one = await Product.create(data);
      return {
        message: "product created",
        response: one._id,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
  read = async () => {
    try {
      let all = await Product.find();
      if (all.length > 0) {
        return {
          message: "product read",
          response: all,
        };
      } else {
        return {
          message: "no products",
          response: null,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  };
  update = async (id, data) => {
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
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  };
  destroy = async (id) => {
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
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  };
}
