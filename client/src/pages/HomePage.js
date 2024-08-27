import React from 'react';
import ExerciseForm from '../components/ExerciseForm';
import ExerciseList from '../components/ExerciseList';

const HomePage = () => {
    return (
        <div>
            <h2>Entrenamiento</h2>
            <ExerciseForm />
            <ExerciseList />
        </div>
    );
};

export default HomePage;
