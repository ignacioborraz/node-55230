import { faker } from "@faker-js/faker";

faker.locale = "es";

export default () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.random.numeric(1),
    id: faker.database.mongodbObjectId(),
    image: faker.image.image(),
  };
};
