const Validate = (values) => {
  const errors = {};
  const requiredFields = ["type", "name"];
  let minLengthFields = ["type", "name"];
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
  if (values["name"] && !/^[a-z0-9]+$/i.test(values["name"])
  ) {

    errors["name"] = "Invalid Name.";
  }
  return errors;
};

export default Validate;
