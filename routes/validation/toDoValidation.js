const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateToDoInput = (data) => {
  let errors = {};

  // check content field
  if (isEmpty(data.content)) {
    errors.content = "Content field is required";
  } else if (!validator.isLength(data.content, { min: 2, max: 30 })) {
    errors.content = "Content must be between 2 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateToDoInput;
