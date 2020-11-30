const Validate = (values) => {
  const errors = {};
  const requiredFields = ["username", "password"];
  let minLengthFields = ["username", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  minLengthFields.forEach((field) => {
    if (values[field] && values[field].length < 4) {
      errors[field] = field + " must be minimum 4 characters.";
    }
  });

  return errors;
};

export default Validate;
