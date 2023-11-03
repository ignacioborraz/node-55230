import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testeando un flujo de operaciones de ADOPT ME!", () => {
  let uid = null;
  let pid = null;
  let cookie = null;
  it("Testeando que se registra un usuario", async () => {
    let data = {
      first_name: "igna",
      last_name: "borraz",
      email: "igna@coder.com.ar",
      password: "hola1234",
    };
    let response = await requester.post("/sessions/register").send(data);
    let { _body, statusCode } = response;
    uid = _body.payload;
    expect(statusCode).to.be.equals(201);
  });
  it("Testeando que el usuario inicia sesión", async () => {
    let data = { email: "igna@coder.com.ar", password: "hola1234" };
    let response = await requester.post("/sessions/login").send(data);
    let { headers } = response;
    //console.log(headers["set-cookie"][0]);
    cookie = {
      name: headers["set-cookie"][0].split("=")[0],
      value: headers["set-cookie"][0].split("=")[1],
    };
    //console.log(cookie);
    expect(cookie.name).to.be.equals("token");
    expect(cookie.value).to.be.ok;
  });
  it("Testeando que el usuario puede cargar una mascota al sistema", async () => {
    let data = { name: "Max", specie: "Gato" };
    let response = await requester
      .post("/pets")
      .send(data)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    let { _body, statusCode } = response;
    pid = _body.payload._id;
    expect(statusCode).to.be.equals(201);
  });
  it("Testeando que la lectura devuelve un array de mascotas", async () => {
    const response = await requester.get("/pets");
    const { _body } = response;
    expect(Array.isArray(_body.payload)).to.be.equals(true);
  });
  it("Testeando que la lectura devuelve un array de objetos", async () => {
    const response = await requester.get("/pets");
    const { _body } = response;
    expect(_body.payload[0]).to.be.a("object");
  });
  it("Testeando que la mascota se actualiza y devuelve status=200", async () => {
    const data = { name: "Igna" };
    const response = await requester
      .put("/pets/" + pid)
      .send(data)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
  it("Testeando que se borran los datos de prueba", async () => {
    let response = await requester
      .delete("/pets/" + pid)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    let result = await requester.delete("/users/" + uid);
    let { statusCode } = response;
    let { _body } = result;
    expect(_body.message).to.be.equals("User deleted");
    expect(statusCode).to.be.equals(200);
  });
});
