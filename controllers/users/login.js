const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  // витягуємо з тіла запиту емейл і пароль
  const { email, password } = req.body;
  // console.log(email);
  // console.log(password);
  // шукаємо по емейлу юзера
  const user = await User.findOne({ email });

  // якщо ми не знайшли користувача, то викидаємо 401 помилку - не авторизований
  if (!user) {
    throw new Unauthorized(`Email ${email} not found`);
  }
  //  // якщо користувач є = то намм потрібно перевірити чи він верифікований
  if (!user.verify) {
    throw new Unauthorized(`Email ${email} is not verify`);
  }
  // якщо користувач є = то намм потрібно перевірити пароль
  const passCompare = await bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw new Unauthorized("Password wrong");
  }

  const payload = {
    id: user._id,
  };
  // створюємо токен
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  // запишемо токен в базу
  await User.findByIdAndUpdate(user._id, { token });
  //  і відправляємо його(заголовки вписуються автоматично)
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
