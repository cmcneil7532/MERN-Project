//Create my functions that will be handled in the controllers folders
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");

//@desc Register new user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter name, email, and password ");
  }
  //Check if user exists
  const userExist = await UserModel.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email already exists");
  }

  //Hash password
  //Generate a salt
  const salt = await bcrypt.genSalt(10);
  //Hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
        //Send user back this info if success
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

//@desc Authenticate user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login  User" });
});

//@desc Get user data
//@route GET /api/users/me
//@access public
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "Display user Data" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
