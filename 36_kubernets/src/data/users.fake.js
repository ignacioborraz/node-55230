import { faker } from "@faker-js/faker";
import productsFake from "./products.fake.js";

faker.locale = "es";

export default () => {
  const numOfProducts = parseInt(
    faker.random.numeric(1, { bannedDigits: ["0"] })
  );
  const products = [];
  for (let i = 0; i < numOfProducts; i++) {
    products.push(productsFake());
  }
  return {
    name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    birthDate: faker.date.birthdate(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    sex: faker.name.sex(),
    products,
  };
};