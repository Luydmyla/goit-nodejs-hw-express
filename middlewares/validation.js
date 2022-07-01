const validation = (schema) => {
  return (req, res, next) => {
    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "missing fields",
      });
      return;
    }
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      error.status = 400;
      // error.message = "missing required name field";
      next(error);
    }
    next();
  };
};
const validationStatusContact = (schema) => {
  return (req, res, next) => {
    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
      return;
    }
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = { validation, validationStatusContact };
