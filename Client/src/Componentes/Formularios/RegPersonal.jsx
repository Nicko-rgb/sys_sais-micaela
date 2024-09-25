import React, { useState } from 'react';
import './reg_personal.css';
import { AiOutlineClose } from "react-icons/ai";
import { IoCloudUploadOutline } from "react-icons/io5";

const RegPersonal = ({ handleForm }) => {
    const [dni, setDni] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [nombres, setNombres] = useState('');
    const [tipoUser, setTipoUser] = useState('jefe');
    const [profesion, setProfesion] = useState('');
    const [servicio, setServicio] = useState('');
    const [especialidad, setEspecialidad] = useState('')
    const [condicion, setCondicion] = useState('Nombrado')
    const [celular, setCelular] = useState('');
    const [correo, setCorreo] = useState('');
    const [nameUser, setNameUser] = useState('');
    const [contrasena, setContraseña] = useState('');
    const [repitContra, setRepitContra] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    //codigo para limiar valores de estados
    const limpiar = () => {
        setDni('');
        setPaterno('');
        setMaterno('')
        setNombres('');
        setTipoUser('');
        setProfesion('');
        setServicio('');
        setCondicion('')
        setCelular('');
        setCorreo('');
        setNameUser('');
        setContraseña('');
        setRepitContra('');
        setMsg('');
    }

    const handleKeyPress = (e) => {
        // Permitir solo números
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault(); // Evitar que se escriban caracteres no numéricos
        }
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
            condicion,
            celular,
            correo,
            nameUser,
            contrasena
        };

        try {
            // Enviar los datos al servidor usando fetch
            const response = await fetch('http://localhost:5000/api/register/personal-salud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPersonal),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Captura el mensaje de error del servidor
                throw new Error(errorData.message || 'Error al registrar el personal.');
            }

            // Manejar la respuesta del servidor
            const result = await response.json();

            limpiar()
            alert('Registro Exitoso')
            setMsg(result.message); // Asumiendo que el servidor devuelve un mensaje

        } catch (error) {
            console.error('Error:', error);
            setMsg('Error al registrar el personal. Intenta nuevamente.');
        } finally {
            setLoading(false); // Asegúrate de detener la carga siempre
            limpiar()
        }
    };

    const [tieneEspecialidad, setTieneEspecialidad] = useState(false);

    const handleCheckboxChange = () => {
        setTieneEspecialidad(!tieneEspecialidad);
        if (!tieneEspecialidad) {
            setEspecialidad(''); // Reiniciar especialidad si se desmarca
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
                                <option value="">Seleccione una opcion</option>
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
                            <label>
                                Seleccione Especialidad:
                                <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
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
                        )}
                    </div>


                    {/* Otros campos */}
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

                    {/* Contraseña */}
                    <div>
                        <label>Contraseña:
                            <input type="password" value={contrasena} onChange={(e) => setContraseña(e.target.value)} />
                        </label>
                        <label>Repetir contraseña:
                            <input type="password" placeholder="repetir contraseña" value={repitContra} onChange={(e) => setRepitContra(e.target.value)} />
                        </label>

                    </div>

                    {/* Mensaje */}
                    {msg && (<p className='msg-personal'> {msg} </p>)}

                    {/* Botón */}
                    <button type='submit' className='btn-personal'>
                        {loading ? 'Cargando...' : 'REGISTRAR'}
                        {loading ? (
                            <IoCloudUploadOutline className="ico flotar" />
                        ) : (
                            <IoCloudUploadOutline className="ico" />
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegPersonal; 