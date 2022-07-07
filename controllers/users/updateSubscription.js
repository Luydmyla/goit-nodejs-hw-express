const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);

  const { subscription } = req.body;
  console.log(subscription);
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  //   console.log(result);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `User with id=${_id} not found`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};
module.exports = updateSubscription;
