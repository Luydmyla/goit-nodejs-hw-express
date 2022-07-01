// обробник маршрутів, що стосуються авторизації та реєстрації
const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiLoginSchema, joiRegisterSchema } = require("../../models/user");
const router = express.Router();
//  запит на реєстрацію - це пост -запити
router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
//  логін маршрут
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

// маршрут для розлогінення користувача
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

// напишемо запит на вибраного користувача
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
