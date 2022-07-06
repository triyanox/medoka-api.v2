import joi from "joi";

/**
 * @usage
 * validate the code recived on the email
 **/
export function validateToken(token) {
  const schema = joi.object({
    token: joi.number().required(),
  });
  const result = schema.validate({
    token: token,
  });
  return result;
}

/**
 * @usage
 * validate the email
 **/
export function validateEmail(email) {
  const schema = joi.object({
    email: joi.string().email().required(),
  });
  const result = schema.validate({
    email: email,
  });
  return result;
}

/**
 * @usage
 * validate the avatar url
 **/
export function validateAvatar(avatar) {
  const schema = joi.object({
    avatar: joi.string().required(),
  });
  const result = schema.validate({
    avatar: avatar,
  });
  return result;
}

/**
 * @usage
 * validate the password
 **/
export function validatePassword(password) {
  const schema = joi.object({
    password: joi.string().min(8).max(256).required(),
  });
  const result = schema.validate({
    password: password,
  });
  return result;
}

/**
 * @usage
 * Validate manager informations
 **/
export function validateManagerInfos({
  firstName,
  lastName,
  phoneNumber,
  countryCode,
}) {
  const schema = joi.object({
    firstName: joi.string().required().messages({
      "number.empty": `First name cannot be an empty field`,
      "any.required": `First name is required`,
    }),
    lastName: joi.string().required().messages({
      "number.empty": `Last name cannot be an empty field`,
      "any.required": `Last name is required`,
    }),
    countryCode: joi.string().required().messages({
      "string.empty": `The country code is required`,
      "any.required": `The country code is required`,
    }),
    phoneNumber: joi.number().required().messages({
      "number.empty": `The phone number cannot be an empty field`,
      "any.required": `The phone number is required`,
    }),
  });
  const result = schema.validate({
    firstName,
    lastName,
    phoneNumber,
    countryCode,
  });

  return result;
}

/**
 * @usage
 * Validate auth credentials
 **/
export function validateCredentials({ email, password }) {
  const schema = joi.object({
    email: joi.string().email().required().messages({
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is required`,
      "string.email": `Email is not valid`,
    }),
    password: joi.string().min(8).max(256).required().messages({
      "string.empty": `Password cannot be an empty field`,
      "any.required": `Password is required`,
      "string.min": `Password must be at least 8 characters`,
      "string.max": `Password must be at most 256 characters`,
    }),
  });
  const result = schema.validate({
    email,
    password,
  });

  return result;
}

/**
 * @usage
 * validate pharmacy informations
 **/
export function validateInfo({ companyName, serialNumber, registrationDate }) {
  const schema = joi.object({
    companyName: joi.string().min(3).max(50).required().messages({
      "string.empty": `The company name cannot be an empty field`,
      "string.min": `The company name must be more than 3 letters`,
      "string.max": `The company name must be less than 50 letters`,
      "any.required": `The company name is required`,
    }),
    serialNumber: joi.number().required().messages({
      "number.empty": `The serial number cannot be an empty field`,
      "any.required": `The serial number is required`,
    }),
    registrationDate: joi.date().required().messages({
      "any.required": `The registration date is required`,
    }),
  });

  const result = schema.validate({
    companyName,
    serialNumber,
    registrationDate,
  });
  return result;
}

/**
 * @usage
 * validate pharmacy adress
 **/
export function validateAdress({ adress }) {
  const schema = joi.object({
    adress: joi.string().min(3).max(50).required().messages({
      "string.empty": `The adress cannot be an empty field`,
      "string.min": `The adress must be more than 3 letters`,
      "string.max": `The adress must be less than 50 letters`,
      "any.required": `The adress is required`,
    }),
  });

  const result = schema.validate({
    adress,
  });
  return result;
}

/**
 * @usage
 * validate phone number
 **/
export function validatePhoneNumber({ phoneNumber, countryCode }) {
  const schema = joi.object({
    countryCode: joi.string().required().messages({
      "string.empty": `The country code is required`,
      "any.required": `The country code is required`,
    }),
    phoneNumber: joi.number().required().messages({
      "number.empty": `The phone number cannot be an empty field`,
      "any.required": `The phone number is required`,
    }),
  });

  const result = schema.validate({
    phoneNumber,
    countryCode,
  });
  return result;
}
