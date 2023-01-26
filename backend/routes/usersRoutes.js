const express = require("express");
const router = express.Router();
const {
  registerUser,
  getMe,
  loginUser,
} = require("../controllers/userControllers");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/me", getMe);

module.exports = router;
