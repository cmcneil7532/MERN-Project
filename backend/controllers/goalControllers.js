//I can use express-async-handler to bypass using try,catch or the .then().catch() methods if I use middleware handlerError
const asyncHandler = require("express-async-handler");

const GoalModel = require("../models/goalsModel");

//@desc Get goals
//@route GET /api/goals
//@ Private
const getGoals = asyncHandler(async (req, res) => {
  //MUST USE await due async
  const goals = await GoalModel.find({ user: req.user.id});

  res.status(200).json(goals);
});

//@desc Set goals
//@route POST /api/goals
//@ Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text Field");
  }

  const goal = await GoalModel.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

//@desc Update goals
//@route PUT /api/goals:id
//@ Private
const updateGoals = asyncHandler(async (req, res) => {
  //grab the id
  const goal = await GoalModel.findById(req.params.id);
  //if id isnt press throw an error
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  // if success grab id and update
  const updatedGoal = await GoalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  //return the schema with the new text
  res.status(200).json(updatedGoal);
});
//@desc Delete goals
//@route DELETE /api/goals/:id
//@ Private
const delteGoals = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  delteGoals,
};
