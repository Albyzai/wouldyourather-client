const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  // data.author = !isEmpty(data.author) ? data.author : "";
  // data.avatar = !isEmpty(data.avatar) ? data.avatar : "";

  // Text Validation
  if (!Validator.isLength(data.text, { min: 6, max: 150 })) {
    errors.text = "The comment may not surpass 150 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Your comment cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
