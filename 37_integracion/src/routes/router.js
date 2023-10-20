import { Router } from "express";

export default class MyRouter {
  //enrutador generico para cualquier recurso
  //el uso de una clase permite ventajas como RESPUESTAS DEFAULT y POLITICAS DE AUTH
  constructor() {
    this.router = Router();
    //como todo enrutador se construye instanciando el módulo Router de express
    this.init();
    //se inicializa "vacío" ya que se inicializará correctamente cuando se lo instancie (en algún recurso o en enrutador principal)
  }
  init() {}
  getRouter = () => this.router; //retorna el enrutador del recurso (para poder usar los endpoints del recurso)
  applyCbs = (cbs) => {
    //aplica los parametros res,res,next según corresponda a cada una de las callbacks (middlewares+controller)
    //cbs = [midl1,midl2,midl3,controller] son todos los middlewares y el controller que necesita el endpoint
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (error) {
        return params[1].status(500).send(error);
      }
    });
  };
  //this.router.post("/api/products",mid1,mid2,mid3,controller)
  create = (path, ...cbs) => this.router.post(path, this.applyCbs(cbs));
  read = (path, ...cbs) => this.router.get(path, this.applyCbs(cbs));
  update = (path, ...cbs) => this.router.put(path, this.applyCbs(cbs));
  destroy = (path, ...cbs) => this.router.delete(path, this.applyCbs(cbs));
  use = (path, ...cbs) => this.router.use(path, this.applyCbs(cbs));
}
