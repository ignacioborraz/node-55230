import ProductsService from "../services/products.service.js";
import MyError from "../config/MyError.js";
import dictionary from "../config/errors.js";

export default class ProductsController {
  //el controlador del recurso se construye en base a los servicios
  //cada controlador va a manejar los requerimientos a enviar al servicio
  //y las respuestas a enviar al cliente
  constructor() {
    this.service = new ProductsService();
  }
  create = async (req, res, next) => {
    try {
      let data = req.body;
      let response = await this.service.create(data,next);
      return res.status(201).json(response);
    } catch (error) {
      error.from = "controller"
      next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      let response = await this.service.read(next);
      if (response.length > 0) {
        return res.status(200).json(response);
      } else {
        return MyError.new(dictionary.notFound)
      }
    } catch (error) {
      error.from = "controller"
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = req.body;
      let response = await this.service.update(id, data, next);
      return res.status(200).json(response);
    } catch (error) {
      error.from = "controller"
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await this.service.destroy(id, destroy);
      return res.status(200).json(response);
    } catch (error) {
      error.from = "controller"
      return next(error);
    }
  };
}
