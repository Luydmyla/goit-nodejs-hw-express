// контроллер реєстрації добавляє користувача в базу
const { Conflict } = require("http-errors");
const { sendMail } = require("../../helpers");
const bcrypt = require("bcryptjs");
// const uuid = require("uuid");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");
const { User } = require("../../models");

const register = async (req, res) => {
  const verificationToken = nanoid();
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(` ${email} in use`);
  }
  //   перед збереженням користувача ми додаємо йому аватар, за допомогою пакету граватар, який генерує аватарку по емейлу користувача
  // створюємо змінну аватврЮрл, викликаючи граватар.юрл и передаємо йому емейл користувача та передаємо цю змінну в нового користувача
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Підтвердження емейлу",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердити емейл</a>`,
  };
  await sendMail(mail);

  res.status(201).json({
    status: "sucess",
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
