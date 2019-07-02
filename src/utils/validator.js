export const submit = (fields, validators) => {
  let valid = true;
  Object.keys(fields).map(key => {
    const { functions, warnings } = validators[key];
    const value = fields[key].value;
    let localValid = true;
    for (let i = 0; i < functions.length; i++) {
      if (functions[i](value)) {
        valid = false;
        localValid = false;
        fields[key] = {
          value,
          errorMessage: warnings[i]
        };
        break;
      }
    }
    if (localValid) {
      fields[key] = {
        value,
        errorMessage: ""
      };
    }
  });
  if (valid) return valid;
  else return fields;
};

export const isEmpty = value => {
  return !value;
};

export const isInvalidEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(email).toLowerCase());
};

export const fieldCheck = (field, validator) => {
  const value = field.value;
  field.errorMessage = "";
  for (let i = 0; i < validator.functions.length; i++) {
    if (validator.functions[i](value)) {
      field.errorMessage = validator.warnings[i];
      break;
    }
  }
  return field;
};

export const isNotISBN = value => {
  try {
    if (parseInt(value) == value && value.length >= 10 && value.length <= 13)
      return false;
  } catch (error) {
    return true;
  }
  return true;
};

export const notExist = object => !object;
