export const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidFullName = name => name.trim().length >= 2;

export const isStrongPassword = password => password.length >= 8;

export const doPasswordsMatch = (password, confirm) => password === confirm;

export const validateSignUp = ({
  fullName,
  email,
  password,
  confirmPassword,
  agreedToTerms,
}) => {
  const errors = {};

  if (!isValidFullName(fullName)) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!isStrongPassword(password)) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!doPasswordsMatch(password, confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!agreedToTerms) {
    errors.agreedToTerms = 'You must agree to the Terms of Service.';
  }

  return errors;
};
