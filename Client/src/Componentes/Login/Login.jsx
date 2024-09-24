import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import EstadoSesion from '../Complementos/EstadoSesion'; // Import EstadoSesion

const Login = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const { handleLogin } = EstadoSesion(); // Use EstadoSesion

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        if (sidebarOpen) {
            setSidebarOpen(false);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior
    
        try {
            const response = await axios.post('http://localhost:5000/api/sais/login', {
                username: username,
                contrasena: password // Ensure this matches what the backend expects
            });

            const { userId, userPersonal, correo, dni, tipoUser, profesion, especialCita, usuario } = response.data;

            handleLogin(userId, userPersonal, correo, dni, tipoUser, profesion, especialCita, usuario); // Use handleLogin from EstadoSesion
            
            navigate('/panel'); // Redirect after successful login

        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Unknown error');
            } else if (error.request) {
                setErrorMessage('No response received from server.');
            } else {
                setErrorMessage('Request error: ' + error.message);
            }
            
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className='login' onClick={closeSidebar}>
            <NavLogin toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                <h2>INICIAR SESIÓN</h2>
                <div>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        placeholder="Ingrese su usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <CiUser className='ico_form_login' />
                </div>
                <div>
                    <label>Clave:</label>
                    <input
                        type="password"
                        placeholder="Su clave"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <RiLockPasswordLine className='ico_form_login' />
                </div>
                <div className="link_reset">
                    <Link to="/reset-password" style={{ fontSize: '13px' }}>¿Olvidaste tu contraseña?</Link>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Ingresar</button>
            </form>
            <NavPie />
        </div>
    );
};

export default Login;