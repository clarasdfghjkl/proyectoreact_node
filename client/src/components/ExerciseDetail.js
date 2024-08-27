import React from 'react';
import useExercise from '../hooks/useExercise';
import { useParams } from 'react-router-dom';




const ExerciseDetail = () => {
    const { id } = useParams();
    const { exercises } = useExercise();
    const exercise = exercises.find(ex => ex.id === Number(id));

    if (!exercise) return <p></p>;

    return (
        <div>
            <h2>Exercise Detail</h2>
            <p>Nombre: {exercise.nombre}</p>
            <p>Reps: {exercise.repeticiones}</p>
        </div>
    );
};

export default ExerciseDetail;
