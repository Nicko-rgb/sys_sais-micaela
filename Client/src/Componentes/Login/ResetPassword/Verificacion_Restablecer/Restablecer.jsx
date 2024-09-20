import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./Restablecer.css";

const Restablecer = () => {
    const { token } = useParams(); // Obtener el token de la URL
    const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
    const [repeatPassword, setRepeatPassword] = useState(''); // Estado para repetir la contraseña
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensajes de éxito
    const [isTokenValid, setIsTokenValid] = useState(false); // Estado para verificar si el token es válido
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        const checkTokenValidity = async () => {
            const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
                method: 'GET', // Método para verificar el token
            });

            if (response.ok) {
                setIsTokenValid(true); // Si la respuesta es correcta, el token es válido
            } else {
                setIsTokenValid(false); // Si la respuesta no es correcta, el token no es válido
            }
        };

        checkTokenValidity(); // Verifica la validez del token al cargar el componente
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Validar que las contraseñas no estén vacías y coincidan
        if (newPassword && repeatPassword) {
            if (newPassword === repeatPassword) {
                try {
                    const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nuevaContrasena: newPassword }), // Enviar la nueva contraseña al servidor
                    });

                    if (response.ok) {
                        setSuccessMessage('Contraseña restablecida con éxito.'); // Mensaje de éxito
                        setTimeout(() => {
                            navigate('/'); // Redirigir a la página de login después de un tiempo
                        }, 3000);
                    } else {
                        const data = await response.json();
                        setErrorMessage(data.message || 'Error al restablecer la contraseña.'); // Mensaje de error
                    }
                } catch (error) {
                    setErrorMessage('Error en la conexión al servidor.'); // Manejo de errores de conexión
                }
            } else {
                setErrorMessage('Las contraseñas no coinciden.'); // Mensaje de error si no coinciden
            }
        } else {
            setErrorMessage('Por favor, ingresa una nueva contraseña.'); // Mensaje de error si no hay contraseña
        }
    };

    if (!isTokenValid) {
        return <p>Este enlace de restablecimiento ha expirado o no es válido.</p>; // Mensaje si el token no es válido
    }

    return (
        <div className='restablecer'>
            <form onSubmit={handleSubmit}>
                <h2>Restablecer Contraseña</h2>
                <div>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        placeholder="Ingrese su nueva contraseña"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} // Actualiza el estado de la nueva contraseña
                        required
                    />
                </div>
                <div>
                    <label>Repetir Contraseña:</label>
                    <input
                        type="password"
                        placeholder="Repita su nueva contraseña"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)} // Actualiza el estado de repetir la contraseña
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error */}
                {successMessage && <p className="success-message">{successMessage}</p>} {/* Muestra el mensaje de éxito */}
                <button type="submit">Restablecer Contraseña</button>
            </form>
        </div>
    );
};

export default Restablecer;
