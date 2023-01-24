//I can use express-async-handler to bypass using try,catch or the .then().catch() methods if I use middleware handlerError
const asyncHandler = require("express-async-handler");

//@desc Get goals
//@route GET /api/goals
//@ Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(400).json({ message: "Got Goal" });
});

//@desc Set goals
//@route POST /api/goals
//@ Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text Field");
  }
  res.status(200).json({ message: "Set Goal" });
});

//@desc Update goals
//@route PUT /api/goals:id
//@ Private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});
//@desc Delete goals
//@route DELETE /api/goals/:id
//@ Private
const delteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  delteGoals,
};
