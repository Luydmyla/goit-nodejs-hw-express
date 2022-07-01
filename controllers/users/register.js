// контроллер реєстрації добавляє користувача в базу
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const register = async (req, res) => {
  const { email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(` ${email} in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    email,
    subscription,
    password: hashPassword,
  });

  res.status(201).json({
    status: "sucess",
    code: 201,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = register;
