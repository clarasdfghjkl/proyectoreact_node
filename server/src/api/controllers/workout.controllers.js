const { response } = require("express");
const Exercise = require("../models/workout.model")


const getExercise = async (req, res) => {
    // aqui es donde se usará el modelo de datos

    try {

        const exercises = await Exercise.find();
        if (!exercises) {
            return res.json({ message: 'Sin resultados' });
        } else {
            return res.json(exercises)
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los ejercicios' });

    }
}
//buscar un producto por nombre /getByName/:name
const getExerciseName = async (req, res) => {
    const { name } = req.params;
    const exerciseByName = await Exercise.find({ name: name })

    res.json(exerciseByName)
}
// añadir un nuevo producto
const add = async (req, res) => {
    try {
        const newExercise = req.body;
        const findExercise = await Exercise.find({ name: newExercise.name })
        if (findExercise.length === 0) {
            // si el producto no está en la BD
            const exercise = new exercise(newExercise)
            const createdExercise = await exercise.save()
            res.status(201).json(createdExercise)
        } else {
            res.status(200).json({ message: "El ejercicio ya existe" })
        }
    } catch (error) {

    }
}

const deleteExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteEx = await Exercise.findByIdAndDelete(id);
        if (deleteEx) {
            res.status(201).json({ success: true, message: deleteEx })
        } else {
            res.status(200).json({ success: false, message: "No existe el id" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateExercise = async (req, res) => {
    try {
        const { id } = req.query;
        const exerciseBody = req.body;
        const updateExercise = await Exercise.findByIdAndUpdate(id, exerciseBody, { new: true })
        //valo
        if (!updateExercise) {
            res.json({ success: false, message: "el id no existe" })
        } else {
            res.json(updateExercise
            )
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
module.exports = { getExercise, getExerciseName, add, deleteExercise, updateExercise }