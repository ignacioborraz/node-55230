import express from "express"
import cors from "cors"
import morgan from "morgan";

import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const PORT = 8008
const ready = ()=> console.log("server ready on port: "+PORT);

const server = express()

//middlewares
server.use(express.json())                              //para leer body (json)
server.use(express.urlencoded({ extended: true }))      //para leer queries y params
server.use(cors())                                      //para permitir cruzar origines (front/back)
server.use(morgan("dev"))                               //para registrar las peticiones del servidor

//endpoints

server.use(errorHandler)                                //para manejo de errores
server.use(notFoundHandler)                             //para manejo de ruta no encontrada

//listen
server.listen(PORT,ready)