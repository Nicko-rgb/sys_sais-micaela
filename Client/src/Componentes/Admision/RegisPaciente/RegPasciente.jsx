import './reg_paciente.css';
import React, { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import icoClose from '../../Ico/ico-close.png'
import lugares from '../../Complementos/lugares.js';
import { useNavigate } from 'react-router-dom';
import SelectHistoria from './SelectHistoria.jsx';

const RegistrarPas = ({ onClose }) => {
    const [dni, setDni] = useState('');
    const [cnvLinea, setCnvLinea] = useState('');
    const [historiaClinico, setHistoriaClinico] = useState('');
    const [paterno, setPaterno] = useState('');
    const [materno, setMaterno] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');
    const [discapacidad, setDiscapacidad] = useState('')
    const [celular1, setCelular1Paciente] = useState('')
    const [celular2, setCelular2Paciente] = useState('')
    const [localidad, setLocalidadPaciente] = useState('')
    const [sector, setSectorPaciente] = useState('')
    const [direccion, setDireccionPaciente] = useState('')
    const [departamento, setDepartamento] = useState('')
    const [provincia, setProvincia] = useState('')
    const [distrito, setDistrito] = useState('')
    const [tipoPaciente, setTipoPaciente] = useState('')

    const [camposResponsable, setCamposResponsable] = useState(false)
    const [checkDiscapsidad, setCheckDiscapacidas] = useState(false)
    const [esMayor, setEsMayor] = useState(false)

    //datos de responsable
    const [dniResponsable, setDniResponsable] = useState('');
    const [tipoResponsable, setTipoResponsable] = useState('');
    const [paternoResponsable, setPaternoResponsable] = useState('');
    const [maternoResponsable, setMaternoResponsable] = useState('');
    const [nombreResponsable, setNombreResponsable] = useState('');
    const [celular1Responsable, setCelular1] = useState('');
    const [celular2Responsable, setCelular2] = useState('');
    const [localidadResponsable, setLocalidad] = useState('')
    const [sectorResponsable, setSector] = useState('')
    const [direccionResponsable, setDireccion] = useState('');
    const [departamentoResponsable, setDepartamentoResponsable] = useState('');
    const [provinciaResponsable, setProvinciaResponsable] = useState('');
    const [distritoResponsable, setDistritoResponsable] = useState('')
    const [error, setError] = useState('')

    //estados y codigos para la seleccion de Lugares
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
        setSelectedProvince(''); // Reiniciar la provincia seleccionada
        setDepartamento(event.target.value)
        setDepartamentoResponsable(event.target.value)
    };

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
        setProvincia(event.target.value)
        setProvinciaResponsable(event.target.value)
    };
    const handleDistritoChange = (event) => {
        setDistrito(event.target.value)
        setDistritoResponsable(event.target.value)
    }

    // Filtrar el departamento seleccionado
    const departmentData = lugares.find(dept => dept.departamento === selectedDepartment);
    const provinces = departmentData ? departmentData.provincias : [];
    const selectedProvinceData = provinces.find(prov => prov.nombre === selectedProvince);
    const districts = selectedProvinceData ? selectedProvinceData.distritos : [];


    //calcular la edad a partir de la f. nacimiento
    const calcularEdad = (fecha) => {
        const fechaActual = new Date();
        const fechaNac = new Date(fecha);
        let edadCalculada = fechaActual.getFullYear() - fechaNac.getFullYear();
        const mes = fechaActual.getMonth() - fechaNac.getMonth();

        // Ajustar la edad si el cumpleaños no ha ocurrido aún este año
        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
            edadCalculada--;
        }

        return edadCalculada;
    };

    const handleFechaChange = (event) => {
        const nuevaFecha = event.target.value;
        setFechaNacimiento(nuevaFecha);

        if (nuevaFecha) {
            const edad = calcularEdad(nuevaFecha); // Asegúrate de que esta función esté bien definida
            setEdad(edad);

            // Mostrar campos del responsable si la edad es menor de 18 años
            setCamposResponsable(edad < 18);
            setEsMayor(edad > 17);

            // Determinar el tipo de paciente según la edad
            if (edad <= 11) {
                setTipoPaciente('Niño');
            } else if (edad >= 12 && edad < 18) {
                setTipoPaciente('Adolescente');
            } else if (edad >= 18 && edad <= 29) {
                setTipoPaciente('Joven');
            } else if (edad >= 30 && edad <= 59) {
                setTipoPaciente('Adulto');
            } else if (edad >= 60) {
                setTipoPaciente('Adulto Mayor');
            }
        } else {
            setEdad('');
            setCamposResponsable(false); // Reiniciar el estado si no hay fecha
            setTipoPaciente(''); // Reiniciar el tipo de paciente si no hay fecha
        }
    };

    const handleSexoChange = (event) => {
        setSexo(event.target.value);
    };


    // codigo para habitlitar formulario de responsable o tutor de paciente
    const checkFormRespons = () => {
        setCamposResponsable(!camposResponsable)
        setEsMayor(true)
    }

    const checkDiscapacidadPas = () => {
        setCheckDiscapacidas(!checkDiscapsidad)
    }

    //codigo para actualizar estados de los "select"
    const handleSelect = (event) => {
        setSectorPaciente(event.target.value)
        setSector(event.target.value)
        setDepartamento(event.target.value)
        setDepartamentoResponsable(event.target.value)
    }

    const handleSelectResponsable = (event) => {
        setTipoResponsable(event.target.value)
    }

    const navigate = useNavigate();

    // Function to handle DNI input
    const handleDniChange = (e) => {
        const input = e.target.value;
        // Only allow numbers and limit to 8 digits
        const numericInput = input.replace(/\D/g, '').slice(0, 8);
        setDni(numericInput);
    };
    // Function to handle DNI input
    const handleDniChanger = (e) => {
        const input = e.target.value;
        // Only allow numbers and limit to 8 digits
        const numericInput = input.replace(/\D/g, '').slice(0, 8);
        setDniResponsable(numericInput);
    };

    const handleHistoriaChange = (e) => {
        const input = e.target.value;
        const numericInput = input.replace(/\D/g, '').slice(0, 8);
        setHistoriaClinico(numericInput)

    }




    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const pacienteData = {
            dni,
            cnvLinea,
            historiaClinico,
            paterno,
            materno,
            nombre,
            fechaNacimiento,
            edad,
            sexo,
            discapacidad: checkDiscapsidad ? discapacidad : null,
            celular1,
            celular2,
            localidad,
            sector,
            direccion,
            departamento,
            provincia,
            distrito,
            tipoPaciente,
            responsable: camposResponsable ? {
                dniRes: dniResponsable,
                tipoRes: tipoResponsable,
                ape_paternoRes: paternoResponsable,
                ape_maternoRes: maternoResponsable,
                nombresRes: nombreResponsable,
                celular1Res: celular1Responsable,
                celular2Res: celular2Responsable,
                localidadRes: localidadResponsable,
                sectorRes: sectorResponsable,
                direccionRes: direccionResponsable,
                departamentoRes: departamentoResponsable,
                provinciaRes: provinciaResponsable,
                distritoRes: distritoResponsable
            } : null
        };

        try {
            const response = await fetch('http://localhost:5000/api/registrar/pacientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pacienteData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }
            navigate(`/panel/${historiaClinico}`)
            onClose()

        } catch (error) {
            console.error(error);
            alert('Error al guardar el paciente');
        }
    };

    return (
        <div className="registrar">
            <form onSubmit={handleSubmit}>
                <img src={icoClose} alt='' className='close_reg' onClick={onClose} title='CERRAR REGISTRO' />
                <div className='center'>
                    <div className="form_paciente">
                        <h3>Datos del Nuevo Paciente</h3>
                        <div className='form-group group'>
                            <label>DNI del Paciente
                                <input
                                    type="text"
                                    onChange={(handleDniChange)}
                                    value={dni}
                                    required
                                    pattern='\d{8}'
                                    title='INGRESE DNI VALIDO DE 8 DIGITOS '
                                    maxLength={"8"}
                                />
                            </label>
                            <label>CNV en línea
                                <input
                                    type="text"
                                    value={cnvLinea}
                                    onChange={(e) => setCnvLinea(e.target.value)}
                                    required
                                />
                            </label>
                            <SelectHistoria handleHistoria={handleHistoriaChange} value={historiaClinico}/>
                        </div>
                        <div className="form-group">
                            <label>Apellido Paterno
                                <input
                                    type="text"
                                    value={paterno}
                                    onChange={(e) => setPaterno(e.target.value)}
                                    required
                                />
                            </label>
                            <label>Apellido Materno
                                <input
                                    type="text"
                                    value={materno}
                                    onChange={(e) => setMaterno(e.target.value)}
                                    required
                                />
                            </label>

                        </div>
                        <label>Nombres
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </label>
                        <div className='form-group'>
                            <label>Fecha Nacimiento
                                <input
                                    type="date"
                                    value={fechaNacimiento}
                                    onChange={handleFechaChange}
                                    required
                                />
                            </label>
                            <label>Su Edad
                                <input
                                    style={{ cursor: 'no-drop', textAlign: 'center' }}
                                    type="text"
                                    value={edad}
                                    disabled
                                />
                            </label>
                            <div className="sexos">
                                <p>Sexo</p>
                                <div>
                                    <label className='label_sexo'>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="Masculino"
                                            checked={sexo === 'Masculino'}
                                            onChange={handleSexoChange}
                                            className='sexo'
                                            required
                                        />
                                        Masculino
                                    </label>
                                    <label className='label_sexo'>
                                        <input
                                            type="radio"
                                            name="sexo"
                                            value="Femenino"
                                            checked={sexo === 'Femenino'}
                                            onChange={handleSexoChange}
                                            className='sexo'
                                            required
                                        />
                                        Femenino
                                    </label>
                                </div>

                            </div>

                        </div>
                        <div className='form-group' id='discapacidad'>
                            <label htmlFor='discapacidad' onClick={checkDiscapacidadPas} className='check_disca'>
                                <input
                                    type="checkbox"
                                    checked={checkDiscapsidad}
                                    readOnly
                                    name='discapacidad'
                                />
                                Tiene Discapacidad?
                            </label>
                            {checkDiscapsidad && (
                                <label>¿Cuál es la discapacidad?
                                    <input
                                        type="text"
                                        value={discapacidad}
                                        onChange={(e) => setDiscapacidad(e.target.value)}
                                    />
                                </label>
                            )}
                        </div>
                        {esMayor && (
                            <>
                                <div className="form-group">
                                    <label>Celular 1<input
                                        type="text"
                                        value={celular1}
                                        onChange={(e) => setCelular1Paciente(e.target.value)}
                                    />
                                    </label>
                                    <label>Celular 2
                                        <input
                                            type="text"
                                            value={celular2}
                                            onChange={(e) => setCelular2Paciente(e.target.value)}
                                            placeholder='Opcional...'
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <label>Localidad
                                        <input
                                            type="text"
                                            value={localidad}
                                            onChange={(e) => setLocalidadPaciente(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <label>Sector
                                        <select value={sector} onChange={handleSelect}>
                                            <option value="">Sin sector</option>
                                            <option value="Sector 1">Sector 1</option>
                                            <option value="Sector 2">Sector 2</option>
                                            <option value="Sector 3">Sector 3</option>
                                            <option value="Sector 4">Sector 4</option>
                                            <option value="Sector 5">Sector 5</option>
                                            <option value="Sector 6">Sector 6</option>
                                            <option value="Sector 7">Sector 7</option>
                                            <option value="Sector 8">Sector 8</option>
                                            <option value="Sector 9">Sector 9</option>
                                        </select>
                                    </label>
                                </div>
                                <label>Direccion
                                    <input
                                        type="text"
                                        value={direccion}
                                        onChange={(e) => setDireccionPaciente(e.target.value)}
                                        required
                                    />
                                </label>
                                <div className='form-group'>
                                    <label>Departamento
                                        <select value={departamento} onChange={handleDepartmentChange} required>
                                            <option value="">Seleccionar Departamento</option>
                                            {lugares.map((dept) => (
                                                <option key={dept.departamento} value={dept.departamento}>{dept.departamento}</option>
                                            ))}
                                        </select>
                                    </label>

                                    <label>Provincia
                                        <select value={provincia} onChange={handleProvinceChange} disabled={!selectedDepartment} required>
                                            <option value="">Seleccionar Provincia</option>
                                            {provinces.map((province) => (
                                                <option key={province.nombre} value={province.nombre}>{province.nombre}</option>
                                            ))}
                                        </select>
                                    </label>

                                    <label>Distrito
                                        <select value={distrito} disabled={!selectedProvince} onChange={handleDistritoChange} required>
                                            <option value="">Seleccionar Distrito</option>
                                            {districts.map((district) => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                        </select>
                                    </label>

                                </div>
                            </>
                        )}
                    </div>

                    {camposResponsable && (
                        <div className='form_responsable'>
                            <h3>Datos del Responsable</h3>
                            <div className='form-group'>
                                <label>DNI del Responsable
                                    <input
                                        onChange={(handleDniChanger)}
                                        value={dniResponsable}
                                        required
                                        maxLength={"8"}
                                        pattern='\d{8}'
                                        title='INGRESE DNI VALIDO DE 8 DIGITOS '
                                    />
                                </label>
                                <label>Tipo Responsable
                                    <select value={tipoResponsable} onChange={handleSelectResponsable} required>
                                        <option value="Padre">Padre</option>
                                        <option value="Madre">Madre</option>
                                        <option value="Hijo">Hijo</option>
                                        <option value="Otros">Otros</option>
                                    </select>
                                </label>
                            </div>
                            <div className="form-group">
                                <label >Apellido Paterno
                                    <input
                                        type="text"
                                        value={paternoResponsable}
                                        onChange={(e) => setPaternoResponsable(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>Apellido Materno
                                    <input
                                        type="text"
                                        value={maternoResponsable}
                                        onChange={(e) => setMaternoResponsable(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <label>Nombre
                                <input
                                    type="text"
                                    value={nombreResponsable}
                                    onChange={(e) => setNombreResponsable(e.target.value)}
                                    required
                                />
                            </label>

                            <div className='form-group'>
                                <label>Celular 1
                                    <input
                                        type="text"
                                        value={celular1Responsable}
                                        onChange={(e) => setCelular1(e.target.value)}
                                        required
                                    />
                                </label>

                                <label>Celular 2
                                    <input
                                        type="text"
                                        value={celular2Responsable}
                                        onChange={(e) => setCelular2(e.target.value)}
                                        placeholder='Opcional...'
                                    />
                                </label>
                            </div>
                            <div className='form-group'>
                                <label>Localidad
                                    <input
                                        type="text"
                                        value={localidadResponsable}
                                        onChange={(e) => setLocalidad(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>Sector
                                    <select value={sectorResponsable} onChange={handleSelect}>
                                        <option value="">Sin sector</option>
                                        <option value="Sector 1">Sector 1</option>
                                        <option value="Sector 2">Sector 2</option>
                                        <option value="Sector 3">Sector 3</option>
                                        <option value="Sector 4">Sector 4</option>
                                        <option value="Sector 5">Sector 5</option>
                                        <option value="Sector 6">Sector 6</option>
                                        <option value="Sector 7">Sector 7</option>
                                        <option value="Sector 8">Sector 8</option>
                                        <option value="Sector 9">Sector 9</option>
                                    </select>
                                </label>
                            </div>
                            <label>Direccion
                                <input
                                    type="text"
                                    value={direccionResponsable}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    required
                                />
                            </label>
                            <div className='form-group'>
                                <label>Departamento
                                    <select value={departamentoResponsable} onChange={handleDepartmentChange} required>
                                        <option value="">Seleccionar Departamento</option>
                                        {lugares.map((dept) => (
                                            <option key={dept.departamento} value={dept.departamento}>{dept.departamento}</option>
                                        ))}
                                    </select>
                                </label>

                                <label>Provincia
                                    <select value={provinciaResponsable} onChange={handleProvinceChange} disabled={!selectedDepartment} required>
                                        <option value="">Seleccionar Provincia</option>
                                        {provinces.map((province) => (
                                            <option key={province.nombre} value={province.nombre}>{province.nombre}</option>
                                        ))}
                                    </select>
                                </label>

                                <label>Distrito
                                    <select value={distritoResponsable} disabled={!selectedProvince} onChange={handleDistritoChange} required>
                                        <option value="">Seleccionar Distrito</option>
                                        {districts.map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <label className='respons' htmlFor='respons' onClick={checkFormRespons}>
                    <input
                        type="checkbox"
                        checked={camposResponsable}
                        readOnly
                        name='respons'
                    />
                    ¿Tiene Responsable?
                </label>
                <div className="mssgs">
                    {error && 
                        <p className="error" style={{color: 'red', fontSize: '14px', textAlign: 'center'}}>{error}</p>
                    }
                </div>
                <div className="btns">
                    <button className='btn-submit' type="submit">Guardar<IoCloudUploadOutline className='ico_guardar' /></button>
                    <button className='btn-cancela' onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default RegistrarPas;