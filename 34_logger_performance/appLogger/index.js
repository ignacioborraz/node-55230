import express from "express";

import env from "./configs/env.js";

import winston from "./middlewares/winston.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundPath from "./middlewares/notFoundPath.js";

const { PORT } = env
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(winston); //registrar por consola TODAS las peticiones que se generen
app.get("/api/test", (req, res) => {
  let response = "response" + request;
  return res.status(200).json({
    message: "logger HTTP",
    response: true,
  });
});
app.use(errorHandler);
app.use(notFoundPath);

app.listen(PORT, () => console.log("server ready on port " + PORT));
