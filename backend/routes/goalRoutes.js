const express = require("express");
const router = express.Router();
const {
  getGoals,
  updateGoals,
  setGoals,
  deleteGoals,
} = require("../controllers/goalController");
const {protect} = require('../middleware/authMiddleware')

router.route("/").get(protect,getGoals).post(protect,setGoals);
router.route("/:id").put(protect,updateGoals).post(protect,deleteGoals);

 

module.exports = router;
