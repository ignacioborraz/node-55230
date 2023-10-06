import { model, Schema } from "mongoose";

let collection = "products";
let schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    url_photo: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

let Product = model(collection, schema);
export default Product;
