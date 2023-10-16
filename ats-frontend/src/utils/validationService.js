export const validateEditForCandidate = (checkedCandidate) => {
  const { isEmailValid, isPhoneNumberValid } = validationFunctions;

  const errors = {
    firstName:
      checkedCandidate.firstName.length < 2 ||
      checkedCandidate.firstName === "" ||
      checkedCandidate.firstName.length > 15,
    lastName:
      checkedCandidate.lastName.length < 2 ||
      checkedCandidate.lastName === "" ||
      checkedCandidate.lastName.length > 15,
    email: !isEmailValid(checkedCandidate.email),
    phone: !isPhoneNumberValid(checkedCandidate.phone),
    location:
      checkedCandidate.location.length < 2 ||
      checkedCandidate.location === "" ||
      checkedCandidate.location.length > 15,
    skill: checkedCandidate.skill === "",
    seniority: checkedCandidate.seniority === "",
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
