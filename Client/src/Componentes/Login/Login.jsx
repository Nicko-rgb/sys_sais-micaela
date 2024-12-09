import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import EstadoSesion from '../Complementos/EstadoSesion';
import imagen from "../../Componentes/IMG/hospital.png";

const Login = () => {
    // State variables
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para el modal de carga

    const navigate = useNavigate();
    const { handleLogin } = EstadoSesion();

    const closeSidebar = () => {
        if (sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    const handleDniChange = (e) => {
        const input = e.target.value;
        const numericInput = input.replace(/\D/g, '').slice(0, 8);
        setDni(numericInput);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Mostrar modal de carga

        try {
            const response = await axios.post('http://localhost:5000/api/sais/login', {
                dni,
                contrasena: password
            });

            const { userId, userPersonal, correo, dni: userDni, tipoUser, profesion, especialCita, usuario } = response.data;
            handleLogin(userId, userPersonal, correo, userDni, tipoUser, profesion, especialCita, usuario);

            // Simular un retraso para que el modal sea más perceptible
            setTimeout(() => {
                setIsLoading(false); // Ocultar modal
                navigate('/panel'); // Redirigir después de ocultar el modal
            }, 1200); // 1.2 segundo de retraso
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    setErrorMessage('El usuario está inactivo, por favor contacte al administrador.');
                } else if (error.response.status === 401) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Error en la solicitud: ' + error.response.data.message);
                }
            } else if (error.request) {
                setErrorMessage('No se recibió respuesta del servidor');
            } else {
                setErrorMessage('Error en la solicitud: ' + error.message);
            }
            setPassword('');
            setIsLoading(false); // Ocultar modal en caso de error
        }
    };

    return (
        <div className='login' onClick={closeSidebar}>
            <div className='content-wrappe'>
                <div className='datosentidad'>
                    <div className='titleentidad'>
                        <h3>Centro de Salud Micaela Bastidas</h3>
                        <h5>Sistema de Atencion Integral de Salud</h5>
                    </div>
                    <div className='imagenDoctores'>
                        <img src={imagen} alt="" />
                    </div>
                    <img className='minsa' src="https://2.bp.blogspot.com/-TRsa_parsRI/UpfISs4O7QI/AAAAAAAAGVU/jO9_iB1FNE4/s1600/logo.Ministerio%2Bde%2BSalud%2B%2528NUEVO%2529.jpg" />
                </div>
                <div className='caja-formulario'>
                    <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
                        <div>
                        <h2>INICIAR SESIÓN</h2>
                        <p>---SAIS---</p>
                        </div>
                        <div>
                            <label>DNI</label>
                            <input
                                type="text"
                                placeholder="Ingrese su DNI"
                                value={dni}
                                onChange={handleDniChange}
                                required
                                maxLength={"8"}
                                pattern='\d{8}'
                            />
                            <CiUser className='ico_form_login' />
                        </div>
                        <div>
                            <label>Clave:</label>
                            <input
                                type="password"
                                placeholder="Ingrese su clave"
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

            {isLoading && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="pulse-circle"></div>
                        <p>INICIANDO SESIÓN...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;