const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  //  витягуємо айді з юзер айді
  const { _id } = req.user;
  // console.log(req.query);
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite === "true") {
    const favoriteContacts = await Contact.aggregate([
      {
        $match: {
          owner: _id,
          favorite: true,
        },
      },
    ]);
    // console.log(favoriteContacts);
    return res.json({
      status: "success",
      code: 200,
      data: {
        result: favoriteContacts,
      },
    });
  }
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,

    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = listContacts;
