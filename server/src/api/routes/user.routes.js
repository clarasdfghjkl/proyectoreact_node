const express = require("express");
const router = express.Router()
const { addUser, addExerciseToUser, getUserById, deleteExerciseUser } = require("../controllers/user.controllers")

router.post("/add", addUser);
router.put("/add/:idExercise/:idUser", addExerciseToUser)
router.get("/getById", getUserById)
router.put("/deleteProduct", deleteExerciseUser)





module.exports = router
