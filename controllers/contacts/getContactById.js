const contactsOperations = require("../../models/contacts");
// const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
    // throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = getContactById;
