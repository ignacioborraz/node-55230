import MyRouter from "./router.js";
import ProductsRouter from "./api/products.js";

let products = new ProductsRouter();
products = products.getRouter();

export default class IndexRouter extends MyRouter {
  //el enrutador principal "obliga" a la aplicación a usar los enrutadores de los recursos
  init() {
    this.use("/products", products);
    //this.use("/carts",carts)
    //this.use("/users",users)
  }
}
