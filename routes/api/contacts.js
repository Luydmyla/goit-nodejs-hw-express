const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contacts");
const { validationStatusContact } = require("../../middlewares/validation");

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  //   validation(favoriteJoiSchema),
  validationStatusContact(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);
module.exports = router;
