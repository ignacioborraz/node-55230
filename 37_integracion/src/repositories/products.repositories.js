import ProductsDTO from "../dao/dto/products.dto.js";
import dao from "../dao/factory.js";
const { Product } = dao;

export default class ProductsRepository {
  constructor() {
    this.model = new Product();
  }
  create = async (data) => {
    try {
      data = new ProductsDTO(data);
      let response = await this.model.create(data);
      return response;
    } catch (error) {
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
  read = async () => {
    try {
      let response = await this.model.read();
      return response;
    } catch (error) {
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
  update = async (id, data) => {
    try {
      let response = await this.model.update(id, data);
      return response;
    } catch (error) {
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
  destroy = async (id) => {
    try {
      let response = await this.model.destroy(id);
      return response;
    } catch (error) {
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
}
