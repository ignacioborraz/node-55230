import args from "../config/args.js";
import env from "../config/env.js";
import { connect } from "mongoose";

let dao = {}; //objeto donde voy a tener los diferentes modelos para los diferentes entornos

switch (args.mode) {
  case "dev":
    connect(env.LINK_DB).then(() => "connected to db");
    const { default: ProductsMongo } = await import("./"); //deberian consologuear que se conectaron a FS
    break;
  default: //"prod"
    connect(env.LINK_DB).then(() => "connected to db");
    break;
}
