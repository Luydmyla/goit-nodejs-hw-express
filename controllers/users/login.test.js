//  ТЕСТ ЩЕ НЕ ПРАЦЮЄ - В ПРОЦЕСІ РОЗРОБКИ!!!!

// імпортуємо експрес для сворення бекенду
const express = require("express");
// для імітації запиту імпортуємо супертест під імям реквест
const request = require("supertest");
const { User } = require("../../models");
// const { ctrlWrapper } = require("../../middlewares");
// // створюємо сервер
const app = express();
app.use(express.json());
// afterEach(() => {
//   jest.useRealTimers();
// });
// jest.setTimeout(10000);

// jest.useFakeTimers("legacy");
let server;
// функція яка запускається до всіх тестів
// в ній запускаємо сервер(щоб ми могли імітувати запит)
// beforeAll(() => app.listen(3000));
beforeAll(() => (server = app.listen(3000)));
// після всіх тестів - зупиняємо сервер
// afterAll(() => app.close());
afterAll(() => server.close());

test("login return user object", async () => {
  // const newUser = {
  //   email: "rebbeca@gmail.com",
  //   password: "88888888qweQWE*",
  //   avatarURL: "one.jpg",
  // };

  // const user = await User.create(newUser);

  //   // jest.useFakeTimers("legacy");
  //   // щоб імітувати запит, ми в реквест запихуємо наш сервер і визиваємо метод запиту, наприклад
  //
  const loginUser = {
    email: "rebbeca@gmail.com",
    password: "88888888qweQWE*",
  };
  const response = await request(app).post("/api/users/login").send(loginUser);
  //   //  .send({ email: "rebbeca@gmail.com", password: "88888888qweQWE*" });
  //   // .set("Accept", "application/json")
  //   // .expect("Content-Type", /json/)
  //   // .expect(200);
  //   //    респонс - це огромний обєкт
  // console.log(response);
  //   // 1-   перевіряємо статус - має бути 200
  //   // expect(response.statusCode).toEqual(200);
  console.log(response.body);
  expect(response.status).toBe(200);
  //   //   2 - перевіряємо боди - то у відповіді приходить обєкт, навіть якщо пустий
  //   // expect(Object.isObject(response.body)).toBe(true);
  //   //   перевіряємо поля обєкту відповіді

  const { body } = response;
  expect(body.token).toByTruthy();
  const user = await User.findById();
  const { token } = await User.findById(user._id);
  expect(body.token).toBe(token);

  //   // expect(typeof body.email).toBe("string");
  //   // expect(typeof body.subscription).toBe("string");
});
