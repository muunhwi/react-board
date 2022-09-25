const required = {
  name: "required",
  match: true,
  reg: /.+/,
  message: "값을 입력해주세요",
};

const contentsRequired = {
  name: "contentsRequired",
  match: false,
  reg: /^<p><br><\/p>/,
  message: "값을 입력해주세요",
};

const email = {
  name: "email",
  match: true,
  reg: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  message: "이메일을 입력해주세요",
};

const password = {
  name: "password",
  match: true,
  reg: /(?=.*\d)(?=.*[a-z]).{8,}/,
  message: "영문 소문자 + 숫자 포함하여 최소 8 글자 입니다.",
};

const validation = [];

validation.push(required);
validation.push(contentsRequired);
validation.push(email);
validation.push(password);

const sort = (value, type) => {
  return validation
    .filter((v) => type.filter((t) => t === v.name).length > 0)
    .filter((v) => v.reg.test(value) !== v.match);
};

const Validation = (name, value, type) => {
  const isValidation = sort(value, type);

  const newValid = {
    name: name,
    valid: false,
    message: "",
    isSubmit: false,
  };

  if (isValidation.length > 0) {
    newValid.valid = false;
    newValid.message = isValidation[0].message;
  } else {
    newValid.valid = true;
  }
  return newValid;
};

export default Validation;
