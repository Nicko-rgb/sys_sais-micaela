import React, { useState } from 'react';
import './formcita.css' 

import { RiCloseCircleFill } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";

// Componente de formulario para agregar una cita
const FormCitas = ({ especialidad, handleCloseForm, hora, fecha, consultorio }) => {
    const [hisClinico, setHisClinico] = useState('')
    const [dni, setDni] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [nombres, setNombres] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [edad, setEdad] = useState('')
    const [telefono, setTelefono] = useState('')
    const [motivoConsulta, setMotivoConsulta] = useState('')

    const [direccion, setDireccion] = useState('')
    const [semEmbarazo, setSemEmbarazo] = useState('')
    const [metodo, setMetodo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        // Cerrar el formulario después de enviar los datos
        handleCloseForm();
    };

    return (
        <div className="form-cita">
            <main>
                <form onSubmit={handleSubmit}>
                    <h2>Agendar cita para {especialidad}</h2>
                        <p> hecha/Hora {fecha} {hora} Consultorio: {consultorio} </p>
                    <div>
                        <label>
                            Hist. Clínico:
                            <input value={hisClinico} onChange={(e) => setHisClinico(e.target.value)} required />
                        </label>
                        <label>
                            DNI:
                            <input value={dni} onChange={(e) => setDni(e.target.value)} required />
                        </label>
                    </div>
                    <label>
                        Apellidos:
                        <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                    </label>
                    <label>
                        Nombres:
                        <input value={nombres} onChange={(e) => setNombres(e.target.value)} required />
                    </label>
                    <div>
                        <label>
                            Fech. Nacimiento:
                            <input type='date' value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
                        </label>
                        <label>
                            Edad:
                            <input type='text' value={edad} onChange={(e) => setEdad(e.target.value)} required />
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
                        <button className='btn-register' type="submit"><TfiWrite className="icon"/>REGISTRAR CITA</button>
                        <button className='btn-close' type="button" onClick={handleCloseForm}> <RiCloseCircleFill className="icon"/> Cerrar</button>
                    </div>
                </form>
            </main>
        </div>
    );
};  

export default FormCitas;