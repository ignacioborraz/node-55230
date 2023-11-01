import assert from "assert";
import PetsRepository from "../../src/repository/pets.repository.js";

describe("Testeando el recurso Pet", () => {
  let repository = new PetsRepository();
  let idToDelete = null;
  it("Testeando que la creación de una mascota, devuelve un objeto con la propiedad _id", async () => {
    let data = { name: "Toto", specie: "Gato" };
    const response = await repository.create(data);
    assert.ok(response._id);
  });
  it("Testeando que la lectura de mascotas responde un array", async () => {
    const response = await repository.getAll();
    assert.strictEqual(Array.isArray(response), true);
  });
  it("Testeando que la lectura de mascotas responde con un array de objetos", async () => {
    const response = await repository.getAll();
    assert.strictEqual(typeof response[0], "object");
  });
  it("Testeando que la actualización de una mascota responde con un objeto actualizado", async () => {
    const response = await repository.update("653fdecd570490d97a0c7866", {
      name: "Lady",
    });
    assert.ok(response._id);
  });
  it("Testeando que la eliminación de una mascota responde con un objeto eliminado", async () => {
    const response = await repository.delete(idToDelete);
    assert.ok(response._id);
  });
});
