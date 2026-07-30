export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validatePhone(phone) {
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
  return phone && phone.trim().length >= 7 && re.test(phone);
}

export function validateRequired(value) {
  return value !== null && value !== undefined && String(value).trim() !== '';
}
