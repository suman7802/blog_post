const User = require("../models/user.model");

function checkEmailValidation(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function checkExistingEmail(email) {
  return await User.findOne({email: email});
}

function checkUserNameValidation(userName) {
  userName = userName.toLowerCase();
  const userNameRegex = /^[a-zA-Z0-9]+$/;
  return userNameRegex.test(userName);
}

async function checkExistingUserName(userName) {
  return await User.findOne({userName: userName});
}

function validPassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

module.exports = {
  checkEmailValidation,
  checkExistingEmail,
  checkUserNameValidation,
  checkExistingUserName,
  validPassword,
};
