import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import EstadoSesion from '../Complementos/EstadoSesion';
import imagen from "../../Componentes/IMG/hospital.png"


const Login = () => {
    // State variables
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dni, setDni] = useState(''); // State for DNI input
    const [password, setPassword] = useState(''); // State for password input
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    const navigate = useNavigate(); // Hook for programmatic navigation

    const { handleLogin } = EstadoSesion(); // Custom hook for managing login state

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Function to close sidebar when clicking outside
    const closeSidebar = () => {
        if (sidebarOpen) {
            setSidebarOpen(false);
        }
    };
    // Function to handle DNI input
    const handleDniChange = (e) => {
        const input = e.target.value;
        // Only allow numbers and limit to 8 digits
        const numericInput = input.replace(/\D/g, '').slice(0, 8);
        setDni(numericInput);
    };


// Función para manejar la presentación del formulario
const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    try {
        // Enviar solicitud POST al API de inicio de sesión
        const response = await axios.post('http://localhost:5000/api/sais/login', {
            dni, // Enviar DNI en lugar de nombre de usuario
            contrasena: password
        });

        // Desestructurar los datos del usuario de la respuesta
        const { userId, userPersonal, correo, dni: userDni, tipoUser, profesion, especialCita, usuario } = response.data;

        // Llamar a la función handleLogin desde EstadoSesion para actualizar el estado de inicio de sesión
        handleLogin(userId, userPersonal, correo, userDni, tipoUser, profesion, especialCita, usuario);

        // Redirigir a la página del panel después del inicio de sesión exitoso
        navigate('/panel');
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            if (error.response.status === 403) {
                // Mostrar mensaje específico si el usuario está inactivo
                setErrorMessage('El usuario está inactivo, por favor contacte al administrador.');
            } else if (error.response.status === 401) {
                // Mostrar mensaje de error de credenciales
                setErrorMessage(error.response.data.message);
            } else {
                // Otros errores
                setErrorMessage('Error en la solicitud: ' + error.response.data.message);
            }
        } else if (error.request) {
            // Error cuando no se recibe respuesta
            setErrorMessage('No se recibió respuesta del servidor');
        } else {
            // Otros errores en la solicitud
            setErrorMessage('Error en la solicitud: ' + error.message);
        }

        // Limpiar el campo de contraseña en caso de error
        setPassword('');
    }
};

    return (
        <div className='login' onClick={closeSidebar}>
            {/* <NavLogin toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} /> */}
            <div className='content-wrappe'>
                <div className='datosentidad'>
                    <div className='titleentidad'>
                        <h3>Centro de Salud Micaela Bastidas</h3>
                        <h5>Sistema de Atencion Integral de Salud </h5>
                    </div>
                    <div className='imagenDoctores'>
                        <img src={imagen} alt="" />

                    </div>

                    <img className='minsa' src="https://2.bp.blogspot.com/-TRsa_parsRI/UpfISs4O7QI/AAAAAAAAGVU/jO9_iB1FNE4/s1600/logo.Ministerio%2Bde%2BSalud%2B%2528NUEVO%2529.jpg"  />


                </div>
                <div className='caja-formulario'>
                    <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                        <h2>INICIAR SESIÓN</h2>
                        <div>
                            <label>DNI</label>
                            <input
                                type="text"
                                placeholder="Ingrese su DNI"
                                value={dni}
                                onChange={(handleDniChange)}
                                required
                                maxLength={"8"}
                                pattern='\d{8}'
                                title='INGRESE DNI VALIDO DE 8 DIGITOS '
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
                </div>





            </div>
            {/* <NavPie /> */}
        </div>
    );
};

export default Login; 