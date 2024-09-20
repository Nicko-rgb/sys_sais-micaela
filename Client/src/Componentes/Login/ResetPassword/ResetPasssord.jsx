import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLogin from '../../Navegadores/NavLogin';
import NavPie from '../../Navegadores/NavPie';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { RiPlayReverseLargeFill } from "react-icons/ri";

const ResetPassword = () => {
    const [email, setEmail] = useState(''); // Estado para el email
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensajes de éxito
    const navigate = useNavigate(); // Hook para redirigir

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulamos el proceso de envío de un correo de restablecimiento
        if (email) {
            setErrorMessage('');
            setSuccessMessage('Se ha enviado un enlace de restablecimiento a tu correo electrónico.');
            setTimeout(() => {
                navigate('/login'); // Redirige a la página de login después de un tiempo
            }, 3000);
        } else {
            setErrorMessage('Por favor, ingresa un correo electrónico válido.');
        }
    };

    return (
        <div className='reset-password'>
            <NavLogin />


            <form onSubmit={handleSubmit}>
                <Link to ="/" className='volver_link'><RiPlayReverseLargeFill /> Volver</Link>

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
