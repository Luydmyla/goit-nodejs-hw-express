const contactsOperations = require("../../models/contacts");

const addContact = async (req, res) => {
  console.log(req.body);
  const result = await contactsOperations.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};
module.exports = addContact;
