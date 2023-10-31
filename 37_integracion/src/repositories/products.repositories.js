import ProductsDTO from "../dao/dto/products.dto.js";
import dao from "../dao/factory.js";
const { Product } = dao;

export default class ProductsRepository {
  constructor() {
    this.model = new Product();
  }
  create = async (data, next) => {
    try {
      data = new ProductsDTO(data);
      let response = await this.model.create(data, next);
      console.log(response);
      return response;
    } catch (error) {
      error.from = "repository"
      console.log(error);
      next(error)
    }
  };
  read = async (next) => {
    try {
      let response = await this.model.read(next);
      return response;
    } catch (error) {
      error.from = "repository"
      return next(error)
    }
  };
  update = async (id, data, next) => {
    try {
      let response = await this.model.update(id, data), next;
      return response;
    } catch (error) {
      error.from = "repository"
      return next(error)
    }
  };
  destroy = async (id, next) => {
    try {
      let response = await this.model.destroy(id, next);
      return response;
    } catch (error) {
      error.from = "repository"
      return next(error)
    }
  };
}
