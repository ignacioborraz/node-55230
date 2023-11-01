import { connect } from "mongoose";

let persistence = process.env.PERSISTENCE

let dao = {};

switch (persistence) {
  case "memory":
    console.log("Memory connected");
    break;
  case "fs":
    console.log("File System connected");
    break;
  default:
    connect("mongodb+srv://igna:hola1234@cluster0.dbl4oxi.mongodb.net/adoptme-55230")
      .then(() => console.log("Mongo connected"))
      .catch((err) => console.log(err));
    const { default: AdoptionsMongo } = await import("./mongo/adoptions.mongo.js");
    const { default: PetsMongo } = await import("./mongo/pets.mongo.js");
    const { default: UsersMongo } = await import("./mongo/users.mongo.js");
    dao = { Adoption: AdoptionsMongo, Pet: PetsMongo, User: UsersMongo };
    break;
}

export default dao;