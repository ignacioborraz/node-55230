import { expect } from "chai";
import UsersRepository from "../../src/repository/users.repository.js";

describe("CD USER", () => {
  let repository = new UsersRepository();
  let idToDelete = null;
  it("CREATE - Must return an object with _id", async () => {
    let data = {
      first_name: "maxi",
      last_name: "coder",
      email: "maxi@coder.com",
      password: "hola1234",
    };
    let response = await repository.create(data);
    idToDelete = response._id;
    expect(response).to.have.property("_id");
  });
  it("DESTROY - Must destroy a user", async () => {
    await repository.delete(idToDelete);
    let response = await repository.getBy({ _id: idToDelete });
    expect(response).to.be.equals(null);
  });
});
