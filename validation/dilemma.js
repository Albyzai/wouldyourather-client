const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDilemmaInput(data) {
  let errors = {};

  data.red = !isEmpty(data.red) ? data.red : "";
  data.blue = !isEmpty(data.blue) ? data.blue : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.prefix = !isEmpty(data.prefix) ? data.prefix : "";

  if (!Validator.isLength(data.title, { max: 40 })) {
    errors.title = "The title may not surpass 40 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "The dilemma needs a title";
  }

  if (!Validator.isLength(data.prefix, { max: 50 })) {
    errors.prefix = "Præfiks må max være 50 tegn";
  }

  // Red Dilemma Validation
  if (!Validator.isLength(data.red, { min: 10, max: 100 })) {
    errors.red = "The red dilemma has to be between 10 and 100 characters";
  }

  if (Validator.isEmpty(data.red)) {
    errors.red = "This field is required";
  }

  // Blue Dilemma Validation
  if (!Validator.isLength(data.blue, { max: 40 })) {
    errors.blue = "The blue dilemma has to be between 10 and 100 characters";
  }

  if (Validator.isEmpty(data.blue)) {
    errors.blue = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
