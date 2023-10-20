import crypto from "crypto"
import args from "../../config/args.js"

export default class ProductsDTO {
    constructor(obj) {
        this.name = obj.name
        this.photo = obj.photo
        this.price = obj.price
        if (args.mode==="dev") {
            this._id = crypto.randomBytes(12).toString('hex')
        }
    }
}
