import express from "express";
import router from "./routes/index.js";
import args from "./config/args.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(args.puerto, () =>
  console.log(args.ambiente + ": server ready on port " + args.puerto)
);
