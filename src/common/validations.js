/* eslint-disable no-useless-escape */
export const REGISTRATION_DATA_VALIDATION = {
    firstName: {
      type: 'string', min: 3, max: 150, regex: /^[a-zA-Z]+$/, required: true
    },
    lastName: {
      type: 'string', min: 3, max: 150, regex: /^[a-zA-Z]+$/, required: true
    },
    phone: {
      type: 'string',
      min: 10,
      max: 10,
      regex: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      required: true
    },
    email: {
      type: 'string',
      min: 8,
      max: 256,
      regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required: true
    },
    addressLine1: {
      type: 'string',
      min: 2,
      max: 1024,
      regex: /[A-Za-z0-9'\.\-\s\,]/,
      required: true
    },
    addressLine2: {
      type: 'string', min: 2, max: 1024, regex: /[A-Za-z0-9'\.\-\s\,]/, required: false
    },
    city: {
      type: 'string',
      min: 3,
      max: 100,
      regex: /^[a-zA-Z]+$/,
      required: true
    },
    state: {
      type: 'string',
      min: 3,
      max: 100,
      regex: /^[a-zA-Z]+$/,
      required: true
    },
    pincode: {
      type: 'string',
      min: 6,
      max: 6,
      regex: /^[1-9][0-9]{5}$/,
      required: true
    }
};

export const PASSWORD_VALIDATION = {
    minLength: {
        minLength: 6,
        ErrorMessage: 'Your password must be at least six characters long.'
    },
    maxLength: {
        maxLength: 50,
        ErrorMessage: 'Your password cannot be longer than 50 characters.'
    },
    digits: {
        regex: /.*\d/,
        ErrorMessage: 'Your password must contain at least one digit.'
    },
    letters: {
        regex: /.*[a-zA-Z]/,
        ErrorMessage: 'Your password must contain at least one letter.'
    },
    specialCharacters: {
        regex: /.*[!@#$%^&*() =+_-]/,
        ErrorMessage: 'Your password must contain at least one symbol in this list !@#$%^&*()=+_- or a space.'
    }
};