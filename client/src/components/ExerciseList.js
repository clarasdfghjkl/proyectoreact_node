import React, { useState, useEffect } from 'react';

const ExerciseList = () => {
    const [exercises, setExercises] = useState(['hola']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editExercise, setEditExercise] = useState({ id: '', nombre: '', repeticiones: '', intensidad: '' });

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch("http://localhost:5000/getExercise");
                if (!response.ok) {

                    throw new Error('Error en la respuesta del servidor');
                }

                const data = await response.json();
                setExercises(data);
            } catch (error) {
                setError(`Error al cargar los ejercicios: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditExercise({
            ...editExercise,
            [name]: value,
        });
    };

    const handleEditExercise = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/getExercise/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: editExercise.nombre,
                    repeticiones: parseInt(editExercise.repeticiones, 10),
                    intensidad: editExercise.intensidad,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el ejercicio');
            }

            const updatedExercise = await response.json();
            setExercises((prevExercises) =>
                prevExercises.map((exercise) =>
                    exercise._id === id ? updatedExercise.exercise : exercise
                )
            );

            // Limpiar el formulario de edición
            setEditExercise({ id: '', nombre: '', repeticiones: '', intensidad: '' });
        } catch (error) {
            setError(`Error al actualizar el ejercicio: ${error.message}`);
        }
    };

    const startEdit = (exercise) => {
        setEditExercise({
            id: exercise._id,
            nombre: exercise.nombre,
            repeticiones: exercise.repeticiones,
            intensidad: exercise.intensidad,
        });
    };

    if (loading) return <p>Cargando ejercicios...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Lista de Ejercicios</h2>
            {console.log(exercises)}
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise._id}>
                        {exercise.nombre} - {exercise.repeticiones} repeticiones - Intensidad: {exercise.intensidad}
                        <button onClick={() => startEdit(exercise)}>Editar</button>
                    </li>
                ))}
            </ul>

            {editExercise.id && (
                <div>
                    <h3>Editar Ejercicio</h3>
                    <input
                        type="text"
                        name="name"
                        value={editExercise.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre del ejercicio"
                    />
                    <input
                        type="number"
                        name="reps"
                        value={editExercise.repeticiones}
                        onChange={handleInputChange}
                        placeholder="Repeticiones"
                    />
                    <select name="intensity" value={editExercise.intensidad} onChange={handleInputChange}>
                        <option value="">Selecciona la intensidad</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                    <button onClick={() => handleEditExercise(editExercise.id)}>
                        Guardar Cambios
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExerciseList;
