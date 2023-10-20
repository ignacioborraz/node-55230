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
  async create(data) {
    try {
      this.products.push(data);
      let data_json = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      return {
        message: "product created",
        response: data._id,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.name,
      };
    }
  }
  read() {
    try {
      let all = this.products;
      if (this.products.length > 0) {
        return {
          message: "product read",
          response: all,
        };
      } else {
        return {
          message: "no products",
          response: null,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  async update(id, data) {
    try {
      let one = this.products.find((each) => each._id == id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        return {
          message: "product updated",
          response: one,
        };
      } else {
        return {
          message: "no product",
          response: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  async destroy(id) {
    try {
      let one = this.products.find((each) => each._id == id);
      if (one) {
        this.products = this.products.filter((each) => each._id !== id);
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        return {
          message: "product deleted",
          response: one._id,
        };
      } else {
        return {
          message: "no product",
          response: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
}
