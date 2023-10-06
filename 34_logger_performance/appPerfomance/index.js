import "dotenv/config.js";

import express from "express";
import { connect } from "mongoose";

import Product from "./dao/products.models.js";
import productsMocks from "./dao/mocks/products.mocks.js";

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
//crear un producto
app.post("/api/products", async (req, res) => {
  try {
    let data = productsMocks();
    let one = await Product.create(data);
    return res.status(201).json({ response: one });
  } catch (error) {
    console.log(error);
  }
});
//leer un producto
app.get("/api/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let one = await Product.findById(id);
    return res.status(200).json({ response: one });
  } catch (error) {
    console.log(error);
  }
});
//destruir un producto
app.delete("/api/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let one = await Product.findByIdAndDelete(id);
    return res.status(200).json({ response: one });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("server ready on port " + port);
  connect(process.env.LINK_DB)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
});
