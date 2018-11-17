import Validator from "validator";
import isEmpty from "./is-Empty";
module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = "ADD SOMETHING THAT IS MORE USEFUL OR GET BANNED";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
