import args from "../config/args.js";

export default class ResponseDTO {
  constructor(total) {
    this.date = new Date().toLocaleDateString();
    this.persistence = args.ambiente;
    this.port = args.puerto;
    this.total = total;
  }
}
