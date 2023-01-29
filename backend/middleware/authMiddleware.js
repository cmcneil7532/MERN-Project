//During our middleware when the user is making a request
//Protect our get me route
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Checking for an authorization header and making sure it starts with the word 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Assign the token to the variable

      token = req.headers.authorization.split(" ")[1];

      //Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized no token");
  }
});

module.exports = {
  protect,
};
