export const validateEditForCandidate = (editedCandidate) => {
  const { isEmailValid, isPhoneNumberValid } = validationFunctions;

  const errors = {
    firstName:
      editedCandidate.firstName.length < 2 || editedCandidate.firstName === "",
    lastName:
      editedCandidate.lastName.length < 2 || editedCandidate.lastName === "",
    email: !isEmailValid(editedCandidate.email),
    phone: !isPhoneNumberValid(editedCandidate.phone),
    location:
      editedCandidate.location.length < 3 || editedCandidate.location === "",
  };

  return errors;
};

const isEmailValid = (testedEmail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(testedEmail);
};

const isPhoneNumberValid = (testedNumber) => {
  const phoneRegex = /^\d{9,11}$/;
  return phoneRegex.test(testedNumber);
};

const validationFunctions = {
  isEmailValid,
  isPhoneNumberValid,
};
