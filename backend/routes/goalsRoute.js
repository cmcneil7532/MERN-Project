const express = require("express");
const router = express.Router();

//Import our functions
const {
  getGoals,
  setGoals,
  updateGoals,
  delteGoals,
} = require("../controllers/goalControllers");
//Protect our routes
const { protect } = require("../middleware/authMiddleware");

//Using the router.route we can combine HTTP request if they use the same ('/')
router.route("/").get(protect, getGoals).post(protect, setGoals);

router.route("/:id").delete(protect, delteGoals);
router.route("/:id").put(protect, updateGoals);

module.exports = router;
