import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        // Aquí puedes implementar la lógica de autenticación
        // Por ahora, vamos a simular el login con un usuario fijo
        if (username === 'user' && password === 'password') {
            setUser({ username });
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
