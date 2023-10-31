import ProductsRepository from "../repositories/products.repositories.js";

export default class ProductsService {
  //el servicio del recurso se construye en base a los repositorios
  //son intermediarios y se pueden utilizar en cualquier parte de la aplicación
  constructor() {
    this.repository = new ProductsRepository()
  }
  create = async (data, next) => {
    try {
      let response = await this.repository.create(data, next)
      return response
    } catch (error) {
      error.from = "service"
      next(error)
    }
  };
  read = async (next) => {
    try {
      let response = await this.repository.read(next)
      return response
    } catch (error) {
      error.from = "service"
      return next(error)
    }
  };
  update = async (id, data, next) => {
    try {
      let response = this.repository.update(id,data, next)
      return response
    } catch (error) {
      error.from = "service"
      return next(error)
    }
  };
  destroy = async (id, next) => {
    try {
      let response = await this.repository.destroy(id, next)
      return response
    } catch (error) {
      error.from = "service"
      return next(error)
    }
  };
}
