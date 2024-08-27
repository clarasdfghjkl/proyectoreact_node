import { useContext } from 'react';
import { ExerciseContext } from '../context/ExerciseContext';

const useExercise = () => {
    return useContext(ExerciseContext);
};

export default useExercise;
