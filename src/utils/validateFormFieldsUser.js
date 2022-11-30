export function validateEmail(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  return !reg.test(email) ? false : true;
}

export function validatePassword(password) {
  let reg = /^(?=.*\d)(?=.*[A-Z])(.{8,50})$/;
  // /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
  return !reg.test(password) ? false : true;
}

export function validateValue(value) {
  let reg = /^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/;

  return !reg.test(value);
}
