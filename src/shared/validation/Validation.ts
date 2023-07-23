import CONSTANTS from '../constants/Constants';

const requiredField = () => {
  return {
    value: true,
    message: 'This field is required',
  };
};

const emailValidation = () => {
  return {
    value: CONSTANTS.EMAIL_REGEX,
    message: 'Wrong email address',
  };
};

const onlyLatin = () => {
  return {
    value: CONSTANTS.LATIN_LETTERS,
    message: 'Wrong email address',
  };
};

const inputMaxLengthLimit = (value: number) => {
  return {
    value: value,
    message: 'Password length is not valid',
  };
};

const onlyNumbers = (value: string) => {
  const REG_EX = /^[0-9]+$/;
  return REG_EX.test(value) ? null : 'Please enter only number';
};

const inputMinLengthLimit = (value: number) => {
  return {
    value: value,
    message: 'Password length is not valid',
  };
};

export {
  requiredField,
  emailValidation,
  onlyLatin,
  inputMaxLengthLimit,
  inputMinLengthLimit,
  onlyNumbers,
};
