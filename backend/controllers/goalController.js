const asyncHandler = require('express-async-handler')  //just a package to use try-catch
const Goal = require('../model/goalModel')
// @desc   GET goals
// @route   GET api/goals
// @access   Private

const getGoals =  asyncHandler(async (req, res) => {
    const goals = await Goal.find() 

res.status(200).json(goals)
//   res.status(200).json({ message: "Getting Goals from controller" });
});





// @desc   POST goals
// @route   GET api/goals
// @access   Private

const setGoals =  asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // return res.status(400).json({message : "Please add The Text field" })
    res.status(400);
    throw new Error("Please Add the text field");
  }

  const goal = await Goal.create({
    text: req.params.text
  })

  res.status(200).json({ message: `Setting Goals from controller` });
});





// @desc   UPDATE goals
// @route   GET api/goals
// @access   Private

const updateGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);
    if(!goal){
        throw new Error("Goal Not found")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatedGoal);
//   res
//     .status(200)
//     .json({ message: `Updating  Goals from controller for ${req.params.id}` });
});





// @desc   DELETE goals
// @route   GET api/goals
// @access   Private

const deleteGoals = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Deleting  Goals from controller for ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
