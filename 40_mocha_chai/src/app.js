import "dotenv/config.js";
import config from "./config/swagger.js";

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import router from "./routes/index.js";

import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const app = express();
const PORT = process.env.PORT || 8080;

const specs = swaggerJSDoc(config);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/docs", serve, setup(specs));

app.use("/api", router);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
