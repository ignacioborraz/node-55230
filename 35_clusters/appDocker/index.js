import "dotenv/config.js";

import express from "express";
import morgan from "morgan";
import { connect } from "mongoose";

const port = process.env.PORT || 8090;
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//endpoints
app.get("/simple", (req, res) => {
  let counter = 0;
  for (let i = 1; i <= 100; i++) {
    counter = counter + i;
  }
  return res.status(200).json({ counter });
});
app.get("/complex", (req, res) => {
  let counter = 0;
  for (let i = 1; i <= 1000000000; i++) {
    counter = counter + i;
  }
  return res.status(200).json({ counter });
});

//server & connection
app.listen(port, () => {
  console.log("server ready on port " + port);
  connect(process.env.LINK_DB)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
});
