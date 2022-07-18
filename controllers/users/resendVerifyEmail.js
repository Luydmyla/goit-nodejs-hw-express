const { User } = require("../../models");
const { sendMail } = require("../../helpers");
const { NotFound, BadRequest } = require("http-errors");
const resendVerifyEmail = async (req, res) => {
  //   первіряємо чиє такий користувач, з таким емейлом
  const { email } = req.body;
  // console.log(email);
  // if (Object.keys(req.body).length === 0) {
  //   res.json({
  //     status: "error",
  //     code: 400,
  //     message: "missing required field email",
  //   });
  //   // throw BadRequest("missing required field email");
  // }

  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound("User not found");
  }
  // якщо він є і він вже варифікованим, то не відправляємо листа
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження емейлу",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Підтвердити емейл</a>`,
  };
  await sendMail(mail);
  //   await User.findByIdAndUpdate(user._id, {
  //     verify: true,
  //     verificationToken: null,
  //   });

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};
module.exports = resendVerifyEmail;
