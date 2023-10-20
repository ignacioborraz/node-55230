import ProductsService from "../services/products.service.js";

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
      let response = await this.service.create(data);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      let response = await this.service.read();
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      let id = req.params.id;
      let data = req.body;
      let response = await this.service.update(id, data);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await this.service.destroy(id);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
