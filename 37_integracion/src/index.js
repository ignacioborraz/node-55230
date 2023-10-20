import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connect } from "mongoose";

import env from "./config/env.js";

import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

import IndexRouter from "./routes/index.js";
let router = new IndexRouter();
router = router.getRouter();

const PORT = env.PORT || 8080;
const ready = () => {
  console.log("server ready on port: " + PORT);
  connect(env.LINK_DB).then(() => "connected to db");	//luego manejar con DAO
};

const server = express();

//middlewares
server.use(express.json()); //para leer body (json)
server.use(express.urlencoded({ extended: true })); //para leer queries y params
server.use(cors()); //para permitir cruzar origines (front/back)
server.use(morgan("dev")); //para registrar las peticiones del servidor

//endpoints
server.use("/api", router); //para enrutar con la palabrita /api las rutas del enrutador principal (generico)
server.use(errorHandler); //para manejo de errores
server.use(notFoundHandler); //para manejo de ruta no encontrada

//listen
server.listen(PORT, ready);
