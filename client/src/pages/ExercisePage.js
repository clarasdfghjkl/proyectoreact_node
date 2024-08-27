import React from 'react';
import { useParams } from 'react-router-dom';
import ExerciseDetail from '../components/ExerciseDetail';
import ExerciseForm from '../components/ExerciseForm';

const ExercisePage = () => {
    const { id } = useParams();

    return (
        <div>
            <ExerciseDetail />
            <h3>Editar ejercicio</h3>
            <ExerciseForm existingExercise={{ id: Number(id) }} />
        </div>
    );
};

export default ExercisePage;
