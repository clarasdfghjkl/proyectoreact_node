
const express = require("express");
const router = express.Router();
const { getExercise, getExerciseName, add, deleteExercise, updateExercise } = require("../controllers/workout.controllers")

router.get("/getExercise", getExercise);
router.get("/getByName/:name", getExerciseName);
router.post("/addExercise", add);
router.delete("/delete/:id", deleteExercise);

//el id lo vamos a enviar a traves de los query
router.put("/updateExercise", updateExercise)


module.exports = router