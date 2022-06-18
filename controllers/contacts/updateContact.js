const contactsOperations = require("../../models/contacts");
// const { NotFound } = require("http-errors");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.body);
  const result = await contactsOperations.updateContact(contactId, req.body);
  console.log(req.body);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
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
module.exports = updateContact;
