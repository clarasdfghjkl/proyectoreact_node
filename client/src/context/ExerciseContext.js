import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
    const [exercises, setExercises] = useState([]);

    const addExercise = (exercise) => {
        setExercises([...exercises, exercise]);
    };

    const deleteExercise = (id) => {
        setExercises(exercises.filter(exercise => exercise.id !== id));
    };

    const updateExercise = (id, updatedData) => {
        setExercises(
            exercises.map(exercise =>
                exercise.id === id ? { ...exercise, ...updatedData } : exercise
            )
        );
    };

    return (
        <ExerciseContext.Provider value={{ exercises, addExercise, deleteExercise, updateExercise }}>
            {children}
        </ExerciseContext.Provider>
    );
};
