import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formcita.css';
import { TfiWrite } from "react-icons/tfi";
import { MdOpenInNew } from "react-icons/md";

// Componente de formulario para agregar una cita
const FormCitas = ({ especialidad, closeForm, hora, fecha, consultorio }) => {
    const navigate = useNavigate();
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

    // Función para buscar paciente por Hist. Clínico
    const handleHisClinicoChange = async (e) => {
        const value = e.target.value.trim();
        setHisClinico(value);

        if (value) {
            try {
                const response = await fetch(`http://localhost:5000/api/obtener-pacientes/hist-clinico/${value}`);
                const data = await response.json();

                // Completar los campos con la información del paciente
                setIdRespons(data.id_responsable);
                setDni(data.dni);
                setApellidos(`${data.ape_paterno} ${data.ape_materno}`);
                setNombres(data.nombres);

                const formattedDate = new Date(data.fecha_nacimiento).toISOString().split('T')[0];
                setFechaNacimiento(formattedDate);

                setEdad(data.edad);
                setTelefono(data.celular1 || data.celular2 || data.celular1_res);
                if (especialidad === 'Medicina') {
                    setDireccion(data.direccion || data.direccion_res);
                }
            } catch (error) {
                console.error('Error al buscar paciente:', error);
                clearFields();
                setDni('')
            } 
        }
    };

    // Función para buscar paciente por DNI
    const handleDniChange = async (e) => {
        const value = e.target.value.trim();
        setDni(value);

        if (value) {
            try {
                const response = await fetch(`http://localhost:5000/api/obtener-pacientes/dni/${value}`);
                const data = await response.json();

                // Completar los campos con la información del paciente
                setIdRespons(data.id_responsable);
                setHisClinico(data.hist_clinico);
                setApellidos(`${data.ape_paterno} ${data.ape_materno}`);
                setNombres(data.nombres);

                const formattedDate = new Date(data.fecha_nacimiento).toISOString().split('T')[0];
                setFechaNacimiento(formattedDate);

                setEdad(data.edad);
                setTelefono(data.celular1 || data.celular2 || data.celular1_res);
                if (especialidad === 'Medicina') {
                    setDireccion(data.direccion || data.direccion_res);
                }
            } catch (error) {
                console.error('Error al buscar paciente:', error);
                clearFields();
                setHisClinico('')
            }
        }
    };

    // Función para limpiar campos
    const clearFields = () => {
        setApellidos('');
        setNombres('');
        setFechaNacimiento('');
        setEdad('');
        setTelefono('');
        if (especialidad === 'Medicina') setDireccion('');
        if (especialidad === 'Planificación') setMetodo('');
        if (especialidad === 'Obstetricia_CPN') setSemEmbarazo('');
    };


    // Función para enviar los datos del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const citaData = {
            especialidad,
            fecha,
            hora,
            consultorio,
            hisClinico,
            dni,
            apellidos,
            nombres,
            fechaNacimiento,
            edad,
            telefono,
            motivoConsulta,
            direccion: especialidad === 'Medicina' ? direccion : undefined,
            metodo: especialidad === 'Planificación' ? metodo : undefined,
            semEmbarazo: especialidad === 'Obstetricia_CPN' ? semEmbarazo : undefined,
            idRespons,
        };

        try {
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
            alert(result.message || 'Cita registrada con éxito');
            closeForm()
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error('Error al registrar la cita:', error);
        }
    };


    // Navegar para editar paciente
    const handleIrEdit = () => {
        navigate(`/panel/${hisClinico}`);
    };

    return (
        <div className="form-cita">
            <form onSubmit={handleSubmit}>
                <p className="ico-close" onClick={closeForm}>×</p>
                <h2>Agendar cita para <span style={{ textDecoration: 'underline' }}>{especialidad}</span> - Niño</h2>
                <div className="fechas">
                    <div className="box-fechas">
                        <p>FECHA</p>
                        <span>{new Date(fecha).toLocaleDateString()} </span>
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
                        <input value={dni} onChange={handleDniChange} required />
                    </label>
                    <p>Filtra datos por Historia clínica o DNI</p>
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
                </div>
                <label>
                    Celular:
                    <input type="text" className='siEdit' value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                </label>
                {especialidad === 'Medicina' && (
                    <label>
                        Dirección:
                        <input type="text" className='siEdit' value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                    </label>
                )}
                {especialidad === 'Planificación' && (
                    <label>
                        Método de Planificación:
                        <input type="text" className='siEdit' value={metodo} onChange={(e) => setMetodo(e.target.value)} required />
                    </label>
                )}
                {especialidad === 'Obstetricia_CPN' && (
                    <label>
                        Semanas de embarazo:
                        <input type="text" className='siEdit' value={semEmbarazo} onChange={(e) => setSemEmbarazo(e.target.value)} required />
                    </label>
                )}
                <label>
                    Motivo de Consulta:
                    <textarea className='siEdit' value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} required />
                </label>
                <div className="btnss">
                    <button className="btn-submit" type="submit"><TfiWrite /> Guardar Cita</button>
                </div>
            </form>
        </div>
    );
};

export default FormCitas;
