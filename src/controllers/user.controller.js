const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const createToken = require("../utils/createToken");

const {
  checkEmailValidation,
  checkExistingEmail,
  checkUserNameValidation,
  checkExistingUserName,
  validPassword,
} = require("../utils/validation");

async function httpRegistration(req, res) {
  const {email, userName, password, conformPassword} = req.body;

  password.trim();
  conformPassword.trim();

  if (!email || !userName || !password || !conformPassword) {
    return res.status(400).json({message: "All fields are required"});
  }

  const validEmail = checkEmailValidation(email);
  const emailExist = await checkExistingEmail(email);
  const validUserName = checkUserNameValidation(userName);
  const userNameExist = await checkExistingUserName(userName);

  if (!validEmail) return res.status(400).json({message: "Invalid email"});

  if (emailExist)
    return res.status(400).json({message: "Email already exists"});

  if (!validUserName)
    return res.status(400).json({message: "only alphanumeric characters"});

  if (userNameExist) {
    return res.status(400).json({message: "UserName  already exists"});
  }
  if (password !== conformPassword)
    return res.status(400).json({message: "Passwords do not match"});

  if (!validPassword(password))
    return res.status(400).json({
      message:
        "Password must be minimum eight characters, at least one letter and one number",
    });

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    email: email,
    userName: userName,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
}

async function httpLogin(req, res) {
  const {email, password} = req.body;
  try {
    const validEmail = checkEmailValidation(email);
    if (!validEmail) return res.status(400).json({message: "Invalid email"});

    const user = await checkExistingEmail(email);
    if (!user)
      return res.status(404).json({message: "This email is not registered"});

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(400).json({message: "Invalid credentials"});

    const token = createToken(user);

    return res
      .cookie("access-token-02", token)
      .status(200)
      .json({message: "Login successful"});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
}

module.exports = {httpRegistration, httpLogin};
