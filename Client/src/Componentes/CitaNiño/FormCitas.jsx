import React, { useState } from 'react';
import './formcita.css';
import { RiCloseCircleFill } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";

// Componente de formulario para agregar una cita
const FormCitas = ({ especialidad, closeForm, hora, fecha, consultorio }) => {
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
    const [idRespons, setIdRespons] = useState('') 

    // Función para buscar paciente por Hist. Clínico
    const handleHisClinicoChange = async (e) => {
        const value = e.target.value;
        setHisClinico(value);
 
        if (value) {
            try {
                const response = await fetch(`http://localhost:5000/api/pacientes/${value}`);
                if (!response.ok) {
                    throw new Error('Paciente no encontrado');
                }
                const data = await response.json();

                // Completar los campos con la información del paciente
                setIdRespons(data.id_responsable)
                setDni(data.dni);
                setApellidos(`${data.ape_paterno} ${data.ape_materno}`);
                setNombres(data.nombres);
                
                // Convertir la fecha de nacimiento al formato correcto
                const formattedDate = new Date(data.fecha_nacimiento).toISOString().split('T')[0];
                setFechaNacimiento(formattedDate);
                
                setEdad(data.edad);
                setTelefono(data.celular1 || data.celular2 || data.celular1_res); // Usar celular1 si está disponible
                if (especialidad === 'Medicina') {
                    setDireccion(data.direccion || data.direccion_res);
                }
                if (especialidad === 'Planificación') {
                    // Aquí puedes establecer un método predeterminado si es necesario
                }
                if (especialidad === 'Obstetricia_CPN') {
                    // Aquí puedes establecer semanas de embarazo predeterminadas si es necesario
                }
            } catch (error) {
                console.error('Error al buscar paciente:', error);
            }
        } else {
            // Limpiar campos si el Hist. Clínico está vacío
            setDni('');
            setApellidos('');
            setNombres('');
            setFechaNacimiento('');
            setEdad('');
            setTelefono('');
            if (especialidad === 'Medicina') {
                setDireccion('');
            }
            if (especialidad === 'Planificación') {
                setMetodo('');
            }
            if (especialidad === 'Obstetricia_CPN') {
                setSemEmbarazo('');
            }
        }
    };

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
            idRespons
        };

        try {
            const response = await fetch('http://localhost:5000/api/registrar/cita-nino', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(citaData),
            });
            
            if (!response.ok) {
                throw new Error('Error al registrar la cita');
            }
            closeForm()
            //mostrar mensaje de exito
            alert('Cita registrada con exito');

            closeForm()
            window.location.reload()
        } catch (error) {
            console.error('Error al registrar la cita:', error);
        } finally{
            // Cerrar el formulario después de enviar los datos
            closeForm()
        }
    };

    return (
        <div className="form-cita">
            <main>
                <form onSubmit={handleSubmit}>
                    <h2>Agendar cita para {especialidad} - Niño</h2>
                    <div className="form-fechaHora">
                        <div className="sub-formfechaHora">
                            <p> FECHA: {fecha} </p>
                            <p> HORA: {hora} </p>
                        </div>
                        <p className='cstr'> CONSULTORIO: Nº {consultorio} </p>
                    </div>
                    <div>
                        <label>
                            Hist. Clínico:
                            <input value={hisClinico} onChange={handleHisClinicoChange} required />
                        </label>
                        <label>
                            DNI:
                            <input value={dni} onChange={(e) => setDni(e.target.value)} required />
                        </label>
                    </div>
                    <label>
                        Apellidos:
                        <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} readOnly required />
                    </label>
                    <label>
                        Nombres:
                        <input value={nombres} onChange={(e) => setNombres(e.target.value)} readOnly required />
                    </label>
                    <div>
                        <label>
                            Fech. Nacimiento:
                            <input type='date' value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} readOnly required />
                        </label>
                        <label>
                            Edad:
                            <input type='text' value={edad} onChange={(e) => setEdad(e.target.value)} readOnly required />
                        </label>
                    </div>
                    <label>
                        Celular:
                        <input type='text' value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                    </label>
                    {especialidad === 'Medicina' && (
                        <label>
                            Direccion:
                            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
                        </label>
                    )}
                    {especialidad === 'Planificación' && (
                        <label>
                            Metodo de Planificación:
                            <input type="text" value={metodo} onChange={(e) => setMetodo(e.target.value)} required />
                        </label>
                    )}
                    {especialidad === 'Obstetricia_CPN' && (
                        <label>
                            Semanas de embarazo:
                            <input type="text" value={semEmbarazo} onChange={(e) => setSemEmbarazo(e.target.value)} required />
                        </label>
                    )}
                    <label>
                        Motivo Consulta:
                        <input value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} required />
                    </label>
                    <div className="btns">
                        <button className='btn-register' type="submit"><TfiWrite className="icon" />REGISTRAR CITA</button>
                        <button className='btn-close' type="button" onClick={closeForm}> <RiCloseCircleFill className="icon" /> Cerrar</button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default FormCitas;