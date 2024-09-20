// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    // Cargar datos del localStorage al iniciar
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setIsLoggedIn(true);
            setUserData(userData);
        }
    }, []);

    const handleLogin = (id, name, correo, dni, tipoUser, profesion, especialCita, usuario) => {
        setIsLoggedIn(true);
        const newUserData = { id, name, correo, dni, tipoUser, profesion, especialCita, usuario };
        setUserData(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserData({});
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);