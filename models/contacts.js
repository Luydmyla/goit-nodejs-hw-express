const { Schema, model } = require("mongoose");

const Joi = require("joi");

const codeRegexp = /^\(?[0-9]{1,3}\)?(-| )?[0-9]{3}(-| )[0-9]{2}(-| )?[0-9]{2}/;

const contactsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
    .required(),
  phone: Joi.string().min(9).pattern(codeRegexp).required(),
  favorite: Joi.boolean().default(false),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const Contact = model("contact", contactsSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
