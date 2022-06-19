const contactsOperations = require("../../models/contacts");
// const { NotFound } = require("http-errors");

const removeContact = async (req, res, next) => {
  console.log(req.params);
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
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
    message: "contact deleted",
    data: {
      result,
    },
  });
};
module.exports = removeContact;
