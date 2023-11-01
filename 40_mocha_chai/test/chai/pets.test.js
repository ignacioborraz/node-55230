import { expect } from "chai";
import PetsRepository from "../../src/repository/pets.repository.js";

describe("Testeando el recurso PET", () => {
  let repository = new PetsRepository();
  let idToDelete = null;
  it("Testeando que la creación de una mascota, devuelve un objeto con la propiedad _id", async () => {
    let data = { name: "Toto", specie: "Gato" };
    const response = await repository.create(data);
    idToDelete = response._id;
    expect(response).to.have.property("_id");
  });
  it("Testeando que la lectura de mascotas, devuelve un array", async () => {
    const response = await repository.getAll();
    expect(Array.isArray(response)).to.be.equals(true);
  });
  it("Testeando que la lectura de mascotas, devuelve un array de objetos", async () => {
    const response = await repository.getAll();
    expect(response[0]).to.be.a("object");
  });
  it("Testeando que la actualización de mascotas, devuelve un objeto diferente", async () => {
    let old = await repository.getBy({ _id: idToDelete });
    const response = await repository.update(idToDelete, { name: "lulu" });
    expect(response).to.not.be.equals(old);
  });
  it("Testeando que la eliminación de mascotas, elimina el documento de la base de datos", async () => {
    await repository.delete(idToDelete);
    let response = await repository.getBy({ _id: idToDelete });
    expect(response).to.be.equals(null);
  });
});
