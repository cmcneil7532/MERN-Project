const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userControllers");

//Create my functions that will handled in the controllers folders
//@desc Register new user
//@route POST /api/users
//@access public

router.post("/", registerUser);

module.exports = router;
