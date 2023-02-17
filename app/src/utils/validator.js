const handleValidation = (
  schema,
  key,
  value,
  validationErrors,
  setValidationErrors
) => {
  console.log("validate");
  let obj = { [key]: value };
  let s = schema.pick([key]);
  s.validate(obj)
    .then((result) => {
      const newValidationErros = { ...validationErrors };
      delete newValidationErros[key];
      setValidationErrors(newValidationErros);
    })
    .catch((err) => {
      setValidationErrors((pre) => ({ ...pre, [err.path]: err.errors[0] }));
    });
};

export default handleValidation;
