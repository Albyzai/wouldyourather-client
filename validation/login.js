const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Username Validation
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  // Password Validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
