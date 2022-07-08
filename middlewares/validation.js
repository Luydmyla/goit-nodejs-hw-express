const validation = (schema) => {
  return (req, res, next) => {
    console.log(req.body);
    const { password } = req.body;
    console.log(password);
    if (Object.keys(req.body).length === 0) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "missing fields",
      });
      return;
    }
    const { error } = schema.validate(req.body);
    // console.log(error.message);
    if (
      error &&
      error.message ===
        `"password" with value "${password}" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
    ) {
      res.status(400).json({
        status: "error",
        code: 400,
        message:
          "паспорт має містити хоча б 1 прописну літеру,1 заглавну, 1 цифру та 1 спец символ і бути не менше 8 символів",
      });
      return;
      // next(error);
    }
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
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
    // console.log(error);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = { validation, validationStatusContact };
