import __dirname from "../../utils.js"

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "ADOPT ME!",
      description: "API of Adopt Me!"
    }
  },
  apis: [__dirname+"src/config/docs/*.yaml"]
}

export default options