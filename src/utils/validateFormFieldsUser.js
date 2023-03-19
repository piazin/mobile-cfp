export function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  return emailRegex.test(email);
}

export function validatePassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(.{8,50})$/;
  return passwordRegex.test(password);
}

export function validateValue(value) {
  let valueRegex = /^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/;

  return !valueRegex.test(value);
}
