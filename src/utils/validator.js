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
