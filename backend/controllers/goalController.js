const asyncHandler = require("express-async-handler"); //just a package to use try-catch
const Goal = require("../model/goalModel");
const User = require("../model/userModel");
// @desc   GET goals
// @route   GET api/goals
// @access   Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
  //   res.status(200).json({ message: "Getting Goals from controller" });
});

// @desc   POST goals
// @route   GET api/goals
// @access   Private

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // return res.status(400).json({message : "Please add The Text field" })
    res.status(400);
    throw new Error("Please Add the text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc   UPDATE goals
// @route   GET api/goals
// @access   Private

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    throw new Error("Goal Not found");
  }
  const user = await User.findById(req.user.id);

  //Check for User

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make sure the loggedin user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized  ");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
  //   res
  //     .status(200)
  //     .json({ message: `Updating  Goals from controller for ${req.params.id}` });
});

// @desc   DELETE goals
// @route   GET api/goals
// @access   Private

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    throw new Error("Goal Not found");
  }
  const user = await User.findById(req.user.id);

  //Check for User

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make sure the loggedin user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorized  ");
  }

  await goal.remomve();

  res.status(200).json({ id: req.params.id})
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
