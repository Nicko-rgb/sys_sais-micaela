import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formcita.css';
import { TfiWrite } from "react-icons/tfi";
import { MdOpenInNew } from "react-icons/md";
import { formatFecha } from '../Complementos/Funciones';

// Componente de formulario para agregar una cita
const FormCitas = ({ especialidad, closeForm, hora, fecha, consultorio, profesional }) => {
    const navigate = useNavigate();
    const [idPaciente, setIdPaciente] = useState('')
    const [hisClinico, setHisClinico] = useState('');
    const [dni, setDni] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nombres, setNombres] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [motivoConsulta, setMotivoConsulta] = useState('');
    const [direccion, setDireccion] = useState('');
    const [semEmbarazo, setSemEmbarazo] = useState('');
    const [metodo, setMetodo] = useState('');
    const [idRespons, setIdRespons] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);
    const [msg, setMsg] = useState({ text: '', type: '' });

    // Function to search for a patient by Clinical History
    const handleHisClinicoChange = async (e) => {
        const value = e.target.value.trim();
        setHisClinico(value);

        // Clear previous messages when input changes
        if (value) {
            setMsg({ text: 'Buscando...', type: 'success' }); // Fixed typo here
            try {
                const response = await fetch(`http://localhost:5000/api/obtener-pacientes/hist-clinico/${value}`);
                const data = await response.json();

                if (!data) {
                    throw new Error('No data found');
                }

                // Complete fields with patient information
                setIdPaciente(data.id_paciente);
                setIdRespons(data.id_responsable);
                setDni(data.dni);
                setApellidos(`${data.ape_paterno} ${data.ape_materno}`);
                setNombres(data.nombres);

                const formattedDate = new Date(data.fecha_nacimiento).toISOString().split('T')[0];
                setFechaNacimiento(formattedDate);

                setEdad(data.edad);
                setTelefono(data.celular1 || data.celular2 || data.celular1_res);
                setDireccion(data.direccion || data.direccion_res);
                setMsg({ text: '', type: '' });
            } catch (error) {
                console.error('Error al buscar paciente:', error);
                setMsg({ text: 'Paciente no encontrado!!', type: 'error' });
                clearFields();
                setDni('');
            }
        } else {
            setMsg({ text: '', type: '' });
        }
    };


    // Función para buscar paciente por DNI
    const handleDniChange = async (e) => {
        const value = e.target.value.trim();
        setDni(value);

        if (value) {
            try {
                if(value.length === 8) {
                    setMsg({ text: 'Buscando...', type: 'success' });
                } else {
                    setMsg({ text: '', type: '' });
                }
                const response = await fetch(`http://localhost:5000/api/obtener-pacientes/dni/${value}`);
                const data = await response.json();

                setTimeout(() => {
                    setIdPaciente(data.id_paciente);
                    setIdRespons(data.id_responsable);
                    setHisClinico(data.hist_clinico);
                    setApellidos(`${data.ape_paterno} ${data.ape_materno}`);
                    setNombres(data.nombres);

                    const formattedDate = new Date(data.fecha_nacimiento).toISOString().split('T')[0];
                    setFechaNacimiento(formattedDate);

                    setEdad(data.edad);
                    setTelefono(data.celular1 || data.celular2 || data.celular1_res);
                    setDireccion(data.direccion || data.direccion_res);
                    setMsg({ text: '', type: '' });
                }, 1000);

            } catch (error) {
                console.error('Error al buscar paciente:', error);
                clearFields();
                setHisClinico('');
                if(value.length === 8) {
                    setMsg({ text: 'Paciente no encontrado!!', type: 'error' });
                }
            }
        }
    };


    // Función para limpiar campos
    const clearFields = () => {
        setIdPaciente('');
        setApellidos('');
        setNombres('');
        setFechaNacimiento('');
        setEdad('');
        setTelefono('');
        setDireccion('');
        setMetodo('');
        setSemEmbarazo('');
    };

    // Función para enviar los datos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Datos del formulario
        const citaData = {
            id_paciente: idPaciente,
            especialidad,
            fecha,
            hora,
            consultorio,
            telefono,
            motivoConsulta,
            direccion,
            metodo,
            semEmbarazo,
            profesional: `${profesional.paterno} ${profesional.materno} ${profesional.nombres}`,
            idRespons,
        };

        try {
            setIsLoading(true); // Mostrar modal de carga
            const response = await fetch('http://localhost:5000/api/registrar/cita-nino', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(citaData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al registrar la cita');
            }
            setModalMessage('Cita registrada con éxito');
        } catch (error) {
            setModalMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false); // Ocultar modal de carga después de completar la operación

            // Opcional: Cerrar el formulario después de mostrar el modal de éxito
            setTimeout(() => {
                if (modalMessage === "Cita registrada con éxito") {
                    closeForm();
                }
            }, 2000); // Cerrar el formulario después de 2 segundos
        }
    };

    const handleModalClose = () => {
        setModalMessage(null); // Limpiar el mensaje del modal
        closeForm(); // Cerrar el formulario directamente si se hace clic en "Cerrar"
    };

    // Navegar para editar paciente
    const handleIrEdit = () => {
        navigate(`/panel/${hisClinico}`);
    };

    return (
        <div className="form-cita">
            {/* Modal de carga */}
            {isLoading && (
                <div className="modal-loading">
                    <div className="loader"></div>
                    <p>Registrando la cita...</p>
                </div>
            )}

            {/* Modal de resultado */}
            {modalMessage && (
                <div className="modal-message">
                    <div className="modal-content">
                        <p>{modalMessage}</p>
                        <button onClick={handleModalClose}>✅</button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <p className="ico-close" onClick={closeForm}>×</p>
                <h2>Agendar cita para <span style={{ textDecoration: 'underline' }}>{especialidad}</span> - Niño</h2>
                <div className="fechas">
                    <div className="box-fechas">
                        <p>FECHA</p>
                        <span>{formatFecha(fecha)} </span>
                    </div>
                    <div className="box-fechas">
                        <p>HORA</p>
                        <span>{hora}</span>
                    </div>
                    <div className="box-fechas">
                        <p>CONSULTORIO </p>
                        <span>N° {consultorio}</span>
                    </div>
                </div>
                <div className="box-btn">
                    <button onClick={handleIrEdit} disabled={!nombres} className={nombres ? 'btn' : 'disable'} >
                        <MdOpenInNew /> Editar Datos
                    </button>
                </div>
                <div className='box-filtra'>
                    <label>
                        Hist. Clínico:
                        <input value={hisClinico} onChange={handleHisClinicoChange} required />
                    </label>
                    <label>
                        DNI:
                        <input value={dni} maxLength={8} onChange={handleDniChange} required />
                    </label>
                    <p className='tx'>Filtra datos por Historia clínica o DNI</p>
                    <p className={`msg ${msg.type === 'success' ? '' : 'msgError'}`}>{msg.text} </p>
                </div>
                <div>
                    <label>
                        Apellidos:
                        <input value={apellidos} className='noo' disabled required />
                    </label>
                    <label>
                        Nombres:
                        <input value={nombres} className='noo' disabled required />
                    </label>
                </div>
                <div>
                    <label>
                        Fech. Nacimiento:
                        <input type="date" className='noo' value={fechaNacimiento} disabled required />
                    </label>
                    <label>
                        Edad:
                        <input type="text" className='noo' value={edad} disabled required />
                    </label>
                    <label>
                        Celular:
                        <input type="text" placeholder='Escribe aquí....' className='siEdit' value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </label>
                </div>
                {especialidad === 'Medicina' && (
                    <label>
                        Dirección:
                        <input type="text" placeholder='Escribe aquí....' className='siEdit' value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                    </label>
                )}
                {especialidad === 'Planificación' && (
                    <label>
                        Método de Planificación:
                        <input type="text" placeholder='Escribe aquí....' className='siEdit' value={metodo} onChange={(e) => setMetodo(e.target.value)} required />
                    </label>
                )}
                {especialidad === 'Obstetricia_CPN' && (
                    <label>
                        Semanas de embarazo:
                        <input type="text" placeholder='Escribe aquí....' className='siEdit' value={semEmbarazo} onChange={(e) => setSemEmbarazo(e.target.value)} required />
                    </label>
                )}
                <label>
                    Motivo de Consulta:
                    <textarea className='siEdit' placeholder='Escribe aquí....' value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} required />
                </label>
                <div className="btnss">
                    <button className='btn-cancela' type='button' onClick={closeForm}>Cancelar</button>
                    <button className="btn-save" type="submit"><TfiWrite /> Guardar Cita</button>
                </div>
            </form>
        </div>
    );
};

export default FormCitas;
