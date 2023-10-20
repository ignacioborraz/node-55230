import ProductsRepository from "../repositories/products.repositories.js";

export default class ProductsService {
  //el servicio del recurso se construye en base a los repositorios
  //son intermediarios y se pueden utilizar en cualquier parte de la aplicación
  constructor() {
    this.repository = new ProductsRepository()
  }
  create = async (data) => {
    try {
      let response = await this.repository.create(data)
      return response
    } catch (error) {
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
  read = async () => {
    try {
      let response = await this.repository.read()
      return response
    } catch (error) {
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
  update = async (id, data) => {
    try {
      let response = this.repository.update(id,data)
      return response
    } catch (error) {
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
  destroy = async (id) => {
    try {
      let response = await this.repository.destroy(id)
      return response
    } catch (error) {
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
}
