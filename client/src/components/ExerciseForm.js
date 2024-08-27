import React, { useState } from 'react';

const AddExerciseForm = ({ onExerciseAdded }) => {
    const [newExercise, setNewExercise] = useState({ name: '', reps: '', intensity: '' });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExercise({
            ...newExercise,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExercise),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el ejercicio');
            }

            const data = await response.json();
            onExerciseAdded(data.exercise); // Llamar a la función para actualizar la lista en el frontend

            // Limpiar el formulario
            setNewExercise({ name: '', reps: '', intensity: '' });
        } catch (error) {
            setError(`Error al agregar el ejercicio: ${error.message}`);
        }
    };

    return (
        <div>
            <h3>Agregar Nuevo Ejercicio</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newExercise.name}
                    onChange={handleInputChange}
                    placeholder="Nombre del ejercicio"
                    required
                />
                <input
                    type="number"
                    name="reps"
                    value={newExercise.reps}
                    onChange={handleInputChange}
                    placeholder="Repeticiones"
                    required
                />
                <select
                    name="intensity"
                    value={newExercise.intensity}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Selecciona la intensidad</option>
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                </select>
                <button type="submit">Agregar Ejercicio</button>
            </form>
        </div>
    );
};

export default AddExerciseForm;
