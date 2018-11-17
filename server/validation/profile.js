import Validator from "validator";
import isEmpty from "./is-Empty";
module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (Validator.isEmail(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
