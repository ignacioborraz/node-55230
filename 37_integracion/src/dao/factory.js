import args from "../config/args.js";
import env from "../config/env.js";
import { connect } from "mongoose";

let dao = {}; //objeto donde voy a tener los diferentes modelos para los diferentes persistencias (entornos)

switch (args.mode) {
  case "dev":   //me comunicar con FS
    console.log("connected to fs");
    //"me conecto a fs"
    const { default: ProductsFs } = await import("./fs/products.fs.js")
    //const { default: CartsFs } = await import("./fs/carts.fs.js")
    //const { default: UsersFs } = await import("./fs/users.fs.js")
    //traer las importaciones dinamicas de la persistencia (fs)
    dao = {
      Product: ProductsFs,
      //Cart: CartFs,
      //User: UserFs
    }
    break;
  default: //"prod" me voy a comunicar con MONGO
    connect(env.LINK_DB).then(() => console.log("connected to db"));
    //me conecto a mongo con el método correspondiente
    const { default: ProductsMongo } = await import("./mongo/products.mongo.js")
    //const { default: CartsMongo } = await import("./mongo/carts.mongo.js")
    //const { default: UsersMongo } = await import("./mongo/users.mongo.js")
    //traer las importaciones dinamicas de la persistencia (mongo)
    dao = {
      Product: ProductsMongo,
      //Cart: CartsMongo,
      //User: UsersMongo
    }
    break;
}

//dao = { Product, Cart, User }
//luego del switch el objeto DAO se llena con la persistencia correspondiente (y tiene estas propiedades)
export default dao 