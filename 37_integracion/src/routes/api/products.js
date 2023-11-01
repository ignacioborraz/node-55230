import MyRouter from "../router.js";
import areValidProps from "../../middlewares/areValidProps.js"
import ProductsController from "../../controllers/products.js";
let controller = new ProductsController();
let { create, read, update, destroy } = controller;

export default class ProductsRouter extends MyRouter {
  //el enrutador del recurso se inicializa con las peticiones que necesitamos crear CRUD
  //requiere tener definidos los controladores
  init() {
    this.create("/", areValidProps, create);
    this.read("/", read);
    this.update("/:id", update);
    this.destroy("/:id", destroy);
  }
}
