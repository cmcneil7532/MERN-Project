const express = require("express");
const router = express.Router();

const {
  getGoals,
  setGoals,
  updateGoals,
  delteGoals,
} = require("../controllers/goalControllers");

//Using the router.route we can combine HTTP request if they use the same ('/')
router.route("/").get(getGoals).post(setGoals);

router.route("/:id").patch(updateGoals).delete(delteGoals);

module.exports = router;
