import "dotenv/config.js";

import express from "express";
import { connect } from "mongoose";

const port = process.env.PORT || 8090;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//operacion simple
app.get("/simple", (req, res) => {
  let counter = 0;
  for (let i = 1; i <= 100; i++) {
    counter = counter + i;
  }
  return res.status(200).json({ counter });
});
//operacion compleja
app.get("/complex", (req, res) => {
  let counter = 0;
  for (let i = 1; i <= 1000000000; i++) {
    counter = counter + i;
  }
  return res.status(200).json({ counter });
});

app.listen(port, () => {
  console.log("server ready on port " + port);
  connect(process.env.LINK_DB)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
});
