const validateInformation = (schema, infor, rules) => {
  const s = schema.pick(rules);
  return s.validate(infor);
};

export default validateInformation;
