import Product from "../dao/models/product.model.js";

export default class ProductsService {
  //el servicio del recurso se construye en base a los repositorios
  //son intermediarios y se pueden utilizar en cualquier parte de la aplicación
  constructor() {}
  create = async (data) => {
    try {
      let ones = await Product.create(data);
      return {
        message: "product creted",
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
      return {
        message: "product read",
        response: all,
      };
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
      return {
        message: "product updated",
        response: one,
      };
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
      return {
        message: "product deleted",
        response: one._id,
      };
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  };
}
