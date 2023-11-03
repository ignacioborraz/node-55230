import assert from "assert";
import PetsRepository from "../../src/repository/pets.repository.js";

describe("CRUD PET", () => {
  let repository = new PetsRepository();
  let idToDelete = null;
  it("CREATE - Must return an object with _id", async () => {
    const response = await repository.create({ name: "Toto", specie: "Gato" });
    idToDelete = response._id;
    assert.ok(response._id);
  });
  it("READ - Must return an array", async () => {
    const response = await repository.getAll();
    assert.strictEqual(Array.isArray(response), true);
  });
  it("UPDATE - Must return an object", async () => {
    const response = await repository.update(idToDelete, { name: "Lady" });
    assert.strictEqual(typeof response, "object");
  });
  it("DESTROY - Must return an object with _id", async () => {
    const response = await repository.delete(idToDelete);
    assert.ok(response._id);
  });
});
