import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useAuth } from '../Complementos/AuthContext'; // Importa el contexto de autenticación

const Login = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const { handleLogin } = useAuth(); // Usar el contexto

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        if (sidebarOpen) {
            setSidebarOpen(false);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
    
        try {
            // Petición POST al backend para iniciar sesión
            const response = await axios.post('http://localhost:5000/api/sais/login', {
                username: username,
                contrasena: password // Asegúrate de que esto coincide con lo que espera el backend
            });
    
            // Extraer los datos recibidos
            const { userId, userPersonal, correo, dni, tipoUser, profesion, especialCita, usuario } = response.data;
    
            // Llama a handleLogin con los datos recibidos
            handleLogin(userId, userPersonal, correo, dni, tipoUser, profesion, especialCita, usuario);
    
            // Redirigir al panel después del inicio de sesión exitoso
            navigate('/panel');
    
        } catch (error) {
            // Manejar los errores y mostrar el mensaje devuelto por el servidor
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Error desconocido');
            } else if (error.request) {
                setErrorMessage('No se recibió respuesta del servidor.');
            } else {
                setErrorMessage('Error al realizar la solicitud: ' + error.message);
            }
            
            // Limpiar los campos de entrada
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