export function validateEmail(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  return !reg.test(email) ? false : true;
}

export function validatePassword(password) {
  let reg =
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

  return !reg.test(password) ? false : true;
}
