import React, { useState } from 'react';
import './reg_personal.css';
import Selected from './Select';
import icoClose from '../Ico/ico-close.png'
import Store from '../Store/Store_Cita_Turno';


const RegPersonal = ({ handleForm }) => {
    const [dni, setDni] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [nombres, setNombres] = useState('');
    const [tipoUser, setTipoUser] = useState('');
    const [profesion, setProfesion] = useState(null);
    const [servicio, setServicio] = useState(null);
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
        if (!/[0-9]/.test(e.key)) e.preventDefault();
    };

    const handleEspecialidadChange = (e) => {
        const selectedEspecialidad = e.target.value;
        setEspecialidad(selectedEspecialidad);
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

        if (!dni || !paterno || !materno || !nombres || !tipoUser || !profesion || !servicio || !condicion || !celular || !correo || !contrasena || !repitContra) {
            setMsg('Todos los campos son obligatorios.');
            setLoading(false);
            return;
        }

        if (contrasena !== repitContra) {
            setMsg('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }

        const dataPersonal = {
            dni, paterno, materno, nombres, tipoUser, profesion: profesion.nombre_profesion, servicio: servicio.nombre_servicio,
            especialidad: tieneEspecialidad ? especialidad : null, consultorio: tieneEspecialidad ? consultorio : null,
            condicion, celular, correo, nameUser, contrasena
        };        

        try {
            const response = await fetch('http://localhost:5000/api/register/personal-salud', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataPersonal),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar el personal.');
            }

            const result = await response.json();
            setMsg(result.message);
            alert('Registro Exitoso');
            handleForm();
        } catch (error) {
            console.error('Errorrr:', error.message);
            setMsg('Error al registrar el personal. ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = () => {
        setTieneEspecialidad(!tieneEspecialidad);
    };

    const handleProfesionChange = (selectedOption) => {
        setProfesion(selectedOption);
    };

    const handleServicioChange = (selectedOption) => {
        setServicio(selectedOption);
    };

    return (
        <div className="reg-personal">
            <form onSubmit={handleFormData} className='form-personal'>
                <img src={icoClose} className='close-personal-form' onClick={handleForm} />
                <h3 style={{ fontSize: '25px' }} >Registrar Nuevo Personal de Salud</h3>
                <div className="fc">
                    <div className="fd">
                        <div>
                            <label>DNI:
                                <input className={`d ${dni ?'activo' : '' }`} value={dni} onChange={(e) => setDni(e.target.value)} maxLength={8} onKeyPress={handleKeyPress} />
                            </label>
                            <label>Nombre:
                                <input className={`${nombres ? 'activo' : ''}`} value={nombres} onChange={(e) => setNombres(e.target.value)} />
                            </label>
                        </div>

                        <div>
                            <label>Paterno:
                                <input className={`${paterno ? 'activo' : ''}`} value={paterno} onChange={(e) => setPaterno(e.target.value)} />
                            </label>
                            <label>Materno:
                                <input className={`${materno ? 'activo' : ''}`} value={materno} onChange={(e) => setMaterno(e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <label>Celular:
                                <input  className={`${celular ?'activo' : '' }`} value={celular} onChange={(e) => setCelular(e.target.value)} maxLength={9} onKeyPress={handleKeyPress} />
                            </label>
                            <label>Correo:
                                <input id='email' className={`d ${correo ?'activo' : '' }`} type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <label>Tipo Usuario:
                                <select className={`${tipoUser ?'activo' : '' }`} value={tipoUser} onChange={(e) => setTipoUser(e.target.value)}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="Jefe">Jefe</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Responsable">Responsable</option>
                                </select>
                            </label>
                            <label>Condición:
                                <select className={`${condicion ?'activo' : '' }`} value={condicion} onChange={(e) => setCondicion(e.target.value)}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="Nombrado">Nombrado</option>
                                    <option value="Contratado">Contratado</option>
                                    <option value="Tercero">Tercero</option>
                                    <option value="CAS">CAS</option>
                                    <option value="CLAS">CLAS</option>
                                    <option value="Serums">Serums</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="fi">
                        <Selected
                            onProfesionChange={handleProfesionChange}
                            onServicioChange={handleServicioChange}
                        />

                        <div className='especialidad'>
                            <label className='label-especialidad'>
                                <input type="checkbox" checked={tieneEspecialidad} onChange={handleCheckboxChange} />
                                Tiene Especialidad en Citas?
                            </label>

                            {tieneEspecialidad && (
                                <>
                                    <label>
                                        Seleccione Especialidad:
                                        <select className={`${especialidad ?'activo' : '' }`} value={especialidad} onChange={handleEspecialidadChange}>
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
                                            <select className={`${consultorio ?'activo' : '' }`} value={consultorio} onChange={(e) => setConsultorio(e.target.value)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </label>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="credencialesAcceso">
                            <fieldset>
                                <legend>credenciales de acceso</legend>
                                <label>Usuario(DNI):
                                    <input className={`${dni ?'activo' : '' }`} value={dni} onChange={(e) => setNameUser(e.target.value)} style={{ cursor: 'no-drop' }} disabled />
                                </label>
                                <label>Contraseña:
                                    <input className={`${contrasena ?'activo' : '' }`} value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                                </label>
                                <label>Repetir contraseña:
                                    <input className={`${repitContra ?'activo' : '' }`} value={repitContra} onChange={(e) => setRepitContra(e.target.value)} />
                                </label>
                            </fieldset>
                        </div>
                        {msg && (<p className='msg-personal'> {msg} </p>)}

                <div className="btns">
                    <button type='button' className="btn-cancela" onClick={handleForm}>Cancelar</button>
                    <button type='submit' disabled={loading} className='btn-submit'>
                        {loading ? 'Guardando...' : 'Registrar'}
                    </button>

                </div>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default RegPersonal;
