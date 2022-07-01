const { Contact } = require("../../models");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.body);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  // console.log(req.body);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateContact;
