import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

    const { handleLogin, handleLogout } = EstadoSesion(); // Custom hook for managing login state

    // Function to toggle sidebar

    useEffect(() => {
        handleLogout();
    }, []);

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


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send POST request to login API
            const response = await axios.post('http://localhost:5000/api/sais/login', {
                dni, // Send DNI instead of username
                contrasena: password
            });

            // Destructure user data from response
            const { userId, userPersonal, correo, dni: userDni, tipoUser, profesion, especialCita, usuario } = response.data;

            // Call handleLogin function from EstadoSesion to update login state
            handleLogin(userId, userPersonal, correo, userDni, tipoUser, profesion, especialCita, usuario);

            // Navigate to panel page on successful login
            navigate('/panel');
        } catch (error) {
            // Error handling
            if (error.response && error.response.data) {
                // Set specific error messages based on server response
                setErrorMessage(error.response.data.message);
            } else if (error.request) {
                // Error when no response is received
                setErrorMessage('No se recibió respuesta del servidor');
            } else {
                // Other request errors
                setErrorMessage('Error en la solicitud: ' + error.message);
            }

            // Clear password field on error
            setPassword('');
        }
    };

    return (
        <div className='login' onClick={closeSidebar}>
            <div className='datosentidad'>
                <div className='titleentidad'>
                    <h3>CENTRO DE SALUD MICAELA BASTIDAS</h3>
                    <h5>Sistema de Atencion Integral de Salud - SAIS</h5>
                </div>
                <img className='doctorimg' src={imagen} alt="" />
                <div className='imagenIco'>
                    <img className='minsa' src="https://www.repositorioeducacion.com/wp-content/uploads/2020/04/minsa-logo.jpg" />
                    <img className='region' src="https://scontent.flim39-1.fna.fbcdn.net/v/t39.30808-6/253557868_270011505131280_1448906634558288335_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEpFkSKGA1xqaAE-Cq-xtIQ2lyvDm9rrRDaXK8Ob2utEHH51SRoaPjkwB-OyK_wDgWIyjQj5eWKu85C97swZZjz&_nc_ohc=9NDKFK7BkKoQ7kNvgFj6OLj&_nc_ht=scontent.flim39-1.fna&_nc_gid=APvgmbo11lnERQXRPbkDP_P&oh=00_AYD48e7oB9kCX6OUyx4ynKoI7SSOHoW2YZR_t2cMHXI8Jw&oe=670C9019" />
                </div>
            </div>
            <div className='caja-formulario'>
                <div class="blur-overlay"></div>
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
    );
};

export default Login; 