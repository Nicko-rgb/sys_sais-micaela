import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavLogin from '../../Navegadores/NavLogin';
import NavPie from '../../Navegadores/NavPie';
import { FaArrowLeft } from "react-icons/fa";
import { RiPlayReverseLargeFill } from "react-icons/ri";

const ResetPassword = () => {
    const [email, setEmail] = useState(''); // Estado para el email
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensajes de éxito
    const navigate = useNavigate(); // Hook para redirigir

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setErrorMessage(''); // Reinicia mensajes de error

        // Validar que el email no esté vacío
        if (email) {
            try {
                const response = await fetch('http://localhost:5000/api/recover-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }), // Enviar el email al servidor
                });

                const data = await response.json();

                if (response.ok) {
                    // Si el servidor responde con éxito
                    setSuccessMessage('Se ha enviado un enlace de restablecimiento a tu correo electrónico.');
                    setTimeout(() => {
                        navigate('/login'); // Redirigir a login después de 3 segundos
                    }, 3000);
                } else {
                    // Si hay un error
                    setErrorMessage(data.message || 'Error al enviar el enlace de restablecimiento.');
                }
            } catch (error) {
                // Manejar errores de red
                setErrorMessage('Error al comunicarse con el servidor. Inténtalo más tarde.');
            }
        } else {
            setErrorMessage('Por favor, ingresa un correo electrónico válido.');
        }
    };

    return (
        <div className='reset-password'>
            <NavLogin />

            <form onSubmit={handleSubmit}>
                <Link to="/login" className='volver_link'><RiPlayReverseLargeFill /> Volver</Link>

                <h2>Restablecer Contraseña</h2>
                <div>
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        placeholder="Ingrese su correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del correo
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error */}
                {successMessage && <p className="success-message">{successMessage}</p>} {/* Muestra el mensaje de éxito */}
                <button type="submit">Enviar enlace de restablecimiento</button>
            </form>
            <NavPie />
        </div>
    );
};

export default ResetPassword;
