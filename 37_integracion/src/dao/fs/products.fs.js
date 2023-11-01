import fs from "fs";

export default class ProductsFs {
  constructor() {
    this.products = [];
    this.path = "./src/dao/fs/files/products.json";
    this.init();
  }
  init() {
    let file = fs.existsSync(this.path);
    if (!file) {
      fs.writeFileSync(this.path, "[]");
    } else {
      this.products = JSON.parse(fs.readFileSync(this.path, "UTF-8"));
    }
    return true;
  }
  async create(one, next) {
    try {
      this.products.push(one);
      let data_json = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      return one;
    } catch (error) {
      error.from = "fs";
      next(error);
    }
  }
  read(next) {
    try {
      return this.products;
    } catch (error) {
      error.from = "fs";
      next(error);
    }
  }
  async update(id, data, next) {
    try {
      let one = this.products.find((each) => each._id === id);
      for (let prop in data) {
        one[prop] = data[prop];
      }
      let data_json = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      return one;
    } catch (error) {
      error.from = "fs";
      return next(error);
    }
  }
  async destroy(id, next) {
    try {
      let one = this.products.find((each) => each._id == id);
      this.products = this.products.filter((each) => each._id !== id);
      let data_json = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      return one;
    } catch (error) {
      error.from = "fs";
      return next(error);
    }
  }
}
