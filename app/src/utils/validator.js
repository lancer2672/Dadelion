export const handleValidateField = (
  schema,
  key,
  value,
  validationErrors,
  setValidationErrors
) => {
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
export const handleValidateObject = (
  schema,
  obj,
  field,
  validationErrors,
  setValidationErrors
) => {
  let s = schema.pick(field);
  keys = Object.keys(obj);
  s.validate(obj)
    .then((result) => {
      const newValidationErros = { ...validationErrors };
      for (let i = 0; i < keys.length; i++) {
        delete newValidationErros[keys[i]];
      }
      setValidationErrors(newValidationErros);
    })
    .catch((err) => {
      setValidationErrors((pre) => ({ ...pre, [err.path]: err.errors[0] }));
    });
};
