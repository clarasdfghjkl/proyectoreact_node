
const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    ejercicio: { type: String, require: true },
    intensidad: { type: String },
    series: { type: Number },
    picturePath: { type: String }
}, { collection: 'exercise' });  // Esto especifica explícitamente la colección

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;