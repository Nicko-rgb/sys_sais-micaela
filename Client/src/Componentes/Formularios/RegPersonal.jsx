import React, { useState } from 'react';
import './reg_personal.css';
import { AiOutlineClose } from "react-icons/ai";
import { IoCloudUploadOutline } from "react-icons/io5";

const RegPersonal = ({ handleForm }) => {
    const [dni, setDni] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [nombres, setNombres] = useState('');
    const [tipoUser, setTipoUser] = useState('');
    const [profesion, setProfesion] = useState('');
    const [servicio, setServicio] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [consultorio, setConsultorio] = useState('1');
    const [condicion, setCondicion] = useState('');
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [repitContra, setRepitContra] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [tieneEspecialidad, setTieneEspecialidad] = useState(false);
    const [mostrarConsultorio, setMostrarConsultorio] = useState(false);

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault(); // Evitar que se escriban caracteres no numéricos
        }
    };

    // Mostrar el campo de consultorio si la especialidad es válida
    const handleEspecialidadChange = (e) => {
        const selectedEspecialidad = e.target.value;
        setEspecialidad(selectedEspecialidad);

        // Mostrar el campo de consultorio si es Enfermería, Medicina u Odontología
        setMostrarConsultorio(
            selectedEspecialidad === 'Enfermería' ||
            selectedEspecialidad === 'Medicina' ||
            selectedEspecialidad === 'Odontología'
        );
    };

    const handleFormData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');
    
        // Validaciones
        if (!dni || !paterno || !materno || !nombres || !tipoUser || !profesion || !servicio || !condicion || !celular || !correo || !nameUser || !contrasena || !repitContra) {
            setMsg('Todos los campos son obligatorios.');
            setLoading(false);
            return;
        }
    
        if (contrasena !== repitContra) {
            setMsg('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }
    
        // Crear un objeto con los datos del formulario
        const dataPersonal = {
            dni,
            paterno,
            materno,
            nombres,
            tipoUser,
            profesion,
            servicio,
            especialidad,
            consultorio: tieneEspecialidad ? consultorio : '',
            condicion,
            celular,
            correo,
            nameUser,
            contrasena
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/register/personal-salud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPersonal),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar el personal.');
            }
    
            const result = await response.json();
            setMsg(result.message);
            alert('Registro Exitoso');
            handleForm()
        } catch (error) {
            setMsg('Error al registrar el personal. Intenta nuevamente.');
            console.error('Error:', error);
            alert('Error al registrar');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = () => {
        setTieneEspecialidad(!tieneEspecialidad);
        if (!tieneEspecialidad) {
            setEspecialidad(''); // Limpiar especialidad si se desmarca
        }
    };

    return (
        <div className="reg-personal">
            <div className="sub-reg">
                <form onSubmit={handleFormData} className='form-personal'>
                    <AiOutlineClose className='close-personal-form' onClick={handleForm} title='CERRAR' />
                    <h3>REGISTRAR NUEVO PERSONAL DE SALUD</h3>

                    <label>DNI:
                        <input type="tel" value={dni} onChange={(e) => setDni(e.target.value)} maxLength={8} onKeyPress={handleKeyPress} />
                    </label>

                    <div>
                        <label>Paterno:
                            <input type="text" value={paterno} onChange={(e) => setPaterno(e.target.value)} />
                        </label>
                        <label>Materno:
                            <input type="text" value={materno} onChange={(e) => setMaterno(e.target.value)} />
                        </label>
                    </div>

                    <label>Nombre:
                        <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                    </label>

                    <div>
                        <label>Tipo Usuario:
                            <select value={tipoUser} onChange={(e) => setTipoUser(e.target.value)}>
                                <option value="">Seleccione una opción</option>
                                <option value="Jefe">Jefe</option>
                                <option value="Admin">Admin</option>
                                <option value="Responsable">Responsable</option>
                            </select>
                        </label>
                        <label>Profesión:
                            <input type="text" value={profesion} onChange={(e) => setProfesion(e.target.value)} />
                        </label>
                        <label>Servicio:
                            <input type="text" value={servicio} onChange={(e) => setServicio(e.target.value)} />
                        </label>
                    </div>

                    <div className='especialidad'>
                        <label className='label-especialidad'>
                            <input
                                type="checkbox"
                                checked={tieneEspecialidad}
                                onChange={handleCheckboxChange}
                            />
                            Tiene Especialidad en Citas?
                        </label>

                        {tieneEspecialidad && (
                            <>
                                <label>
                                    Seleccione Especialidad:
                                    <select value={especialidad} onChange={handleEspecialidadChange}>
                                        <option value="">Seleccione una opción</option>
                                        <option value="Enfermería">Enfermería</option>
                                        <option value="Medicina">Medicina</option>
                                        <option value="Psicología">Psicología</option>
                                        <option value="Nutrición">Nutrición</option>
                                        <option value="Odontología">Odontología</option>
                                        <option value="Planificación">Planificación</option>
                                        <option value="Obstetricia_CPN">Obstetricia_CPN</option>
                                    </select>
                                </label>

                                {mostrarConsultorio && (
                                    <label>
                                        N° Consultorio:
                                        <select value={consultorio} onChange={(e) => setConsultorio(e.target.value)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </label>
                                )}
                            </>
                        )}
                    </div>

                    <div>
                        <label>Condición:
                            <select value={condicion} onChange={(e) => setCondicion(e.target.value)}>
                                <option value="">Seleccione una opción</option>
                                <option value="Nombrado">Nombrado</option>
                                <option value="Contratado">Contratado</option>
                                <option value="Tercero">Tercero</option>
                                <option value="CAS">CAS</option>
                                <option value="CLAS">CLAS</option>
                                <option value="Serums">Serums</option>
                            </select>
                        </label>
                        <label>Celular:
                            <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} onKeyPress={handleKeyPress} />
                        </label>
                    </div>

                    <label>Correo:
                        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </label>
                    <label>Nombre de Usuario:
                        <input type="text" value={nameUser} onChange={(e) => setNameUser(e.target.value)} />
                    </label>

                    <div>
                        <label>Contraseña:
                            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                        </label>
                        <label>Repetir contraseña:
                            <input type="password" value={repitContra} onChange={(e) => setRepitContra(e.target.value)} />
                        </label>
                    </div>

                    {msg && (<p className='msg-personal'> {msg} </p>)}

                    <button type='submit' className='btn-personal'>
                        {loading ? 'Cargando...' : 'REGISTRAR'}
                        <IoCloudUploadOutline className={`ico ${loading ? 'flotar' : ''}`} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegPersonal;
