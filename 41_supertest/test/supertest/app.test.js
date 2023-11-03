import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testeando los recursos de ADOPT ME!", () => {
  //describe("Testeando PET",()=>{
  //describe("Testeando ADOPTION",()=>{})
  //describe("Testeando USER",()=>{})
});
