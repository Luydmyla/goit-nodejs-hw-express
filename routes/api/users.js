// обробник маршрутів, що стосуються авторизації та реєстрації
const express = require("express");

const { auth, validation, upload, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const {
  joiLoginSchema,
  joiRegisterSchema,
  subscriptionJoiSchema,
} = require("../../models/user");
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

// маршрут для запит на вибраного користувача
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

// Обновление підписки (subscription) користувача
router.patch(
  "/",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
// маршрут для обновлення аватара, обовязково мідлвара аус - не може отримати аватарку той хто ще не залогінився,
//  а другу передаємо мідлвару малтер
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
