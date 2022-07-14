const { User } = require("../../models");
const { NotFound } = require("http-errors");
const verifyEmail = async (req, res) => {
  // 1- треба считати веріфікейшн токен з адреси
  // 2 - знайти в базі юзера у якого є такий токен
  // витягуємо з параметрів запиту токен - все що написано в запиті після : зьерігається в реквест парамс
  const { verificationToken } = req.params;
  console.log(verificationToken);

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound();
  }
  console.log(user);
  //   console.log(user._id);
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};
module.exports = verifyEmail;
