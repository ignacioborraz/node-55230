import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = model(collection, schema);
export default Product;
