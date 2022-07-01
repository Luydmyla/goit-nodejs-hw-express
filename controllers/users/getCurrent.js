// const { json } = require("express/lib/response");
// const { User } = require("../../models");
// цей контроллер повинен знати про якого конкретно користувача йде запит
// для цього коли нам потрібен персоналізована відповідь  то нам потрібна якась інфо про користувача - хто питає
// для цього зазвичай роблять окремий мідлвар назвали аус
const getCurrent = async (req, res) => {
  // тут в реквес юзерз вона запише всю інфо про того хто питає, вона отримає її з бази і запише її
  console.log(req.user);
  // тепер ми можемо її відправити
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};
module.exports = getCurrent;
