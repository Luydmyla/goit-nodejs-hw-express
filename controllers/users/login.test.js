// для імітації запиту імпортуємо супертест під імям реквест
const request = require("supertest");
const url = "http://localhost:3000";

test("login return user object", async () => {
  //   // щоб імітувати запит, ми в реквест запихуємо наш сервер і визиваємо метод запиту, наприклад
  const loginUser = {
    email: "figibeh772@storypo.com",
    password: "55555555QWEqwe*",
  };
  const response = await request(url).post("/api/users/login").send(loginUser);
  // 1-   перевіряємо статус - має бути 200
  // console.log(response.body);
  expect(response.status).toBe(200);
  //   2 - перевіряємо боди - то у відповіді приходить обєкт, навіть якщо пустий
  const { body } = response;
  expect(typeof body).toBe("object");
  //   3 - перевіряємо чи є токен
  expect(body.data.token).not.toBeUndefined();
  //   4 - перевіряємо поля обєкту відповіді
  expect(typeof body.data.token).toBe("string");
  expect(typeof body.data.user.email).toBe("string");
  expect(typeof body.data.user.subscription).toBe("string");
});
