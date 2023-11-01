import { expect } from "chai";
import PetsRepository from "../../src/repository/pets.repository.js";

describe("CRUD PET", () => {
  let repository = new PetsRepository();
  let idToDelete = null;
  it("CREATE - Must return an object with _id", async () => {
    const response = await repository.create({ name: "Toto", specie: "Gato" });
    idToDelete = response._id;
    expect(response).to.have.property("_id");
  });
  it("READ - Must return an array", async () => {
    const response = await repository.getAll();
    expect(Array.isArray(response)).to.be.equals(true);
  });
  it("READ - Must return an array of objects", async () => {
    const response = await repository.getAll();
    expect(response[0]).to.be.a("object");
  });
  it("UPDATE - Must return a different pet", async () => {
    let old = await repository.getBy({ _id: idToDelete });
    const response = await repository.update(idToDelete, { name: "lulu" });
    expect(response).to.not.be.equals(old);
  });
  it("DESTROY - Must destroy a pet", async () => {
    await repository.delete(idToDelete);
    let response = await repository.getBy({ _id: idToDelete });
    expect(response).to.be.equals(null);
  });
});
