import React, { useState, useEffect } from 'react';
import './editarpas.css';
import OpcionesD from './OpcionesD';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';

const EditPaciente = ({ paciente, onClose }) => {

    const [formData, setFormData] = useState({
        id_res: paciente.id_responsable,
        dni: paciente.dni,
        cnv_linea: paciente.CNV_linea,
        hist_clinico: paciente.hist_clinico, 
        nombres: paciente.nombres,
        ape_paterno: paciente.ape_paterno,
        ape_materno: paciente.ape_materno,
        fecha_nacimiento: paciente.fecha_nacimiento,
        edad: paciente.edad,
        sexo: paciente.sexo,

        dni_res: paciente.dni_res,
        tipo_res: paciente.tipo_res,
        nombres_res: paciente.nombres_res,
        ape_paterno_res: paciente.ape_paterno_res,
        ape_materno_res: paciente.ape_materno_res,
        celular1_res: paciente.celular1_res,
        celular2_res: paciente.celular2_res,
        localidad_res: paciente.localidad_res,
        sector_res: paciente.sector_res,
        direccion_res: paciente.direccion_res,
        departamento_res: paciente.departamento_res,
        provincia_res: paciente.provincia_res,
        distrito_res: paciente.distrito_res
    });

    const [activeSection, setActiveSection] = useState('datos'); // Sección activa por defecto
    const [animateClass, setAnimateClass] = useState(''); // Clase de animación

    useEffect(() => {
        setFormData({
            id_res: paciente.id_responsable,
            dni: paciente.dni,
            cnv_linea: paciente.CNV_linea,
            hist_clinico: paciente.hist_clinico,
            nombres: paciente.nombres,
            ape_paterno: paciente.ape_paterno,
            ape_materno: paciente.ape_materno,
            fecha_nacimiento: paciente.fecha_nacimiento,
            edad: paciente.edad,
            sexo: paciente.sexo,

            dni_res: paciente.dni_res,
            tipo_res: paciente.tipo_res,
            nombres_res: paciente.nombres_res,
            ape_paterno_res: paciente.ape_paterno_res,
            ape_materno_res: paciente.ape_materno_res,
            celular1_res: paciente.celular1_res,
            celular2_res: paciente.celular2_res,
            localidad_res: paciente.localidad_res,
            sector_res: paciente.sector_res,
            direccion_res: paciente.direccion_res,
            departamento_res: paciente.departamento_res,
            provincia_res: paciente.provincia_res,
            distrito_res: paciente.distrito_res
        });
    }, [paciente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
        onClose();
    };

    const handleButtonClick = (section) => {
        setActiveSection(section);
        setAnimateClass('animate'); // Activar la animación
        setTimeout(() => {
            setAnimateClass(''); // Remover la clase después de la animación
        }, 500); // Duración de la animación
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'nacimiento':
                return (
                    <section className={`container-editar-nacimiento ${animateClass}`}>
                        <h3>DATOS DE NACIMIENTO</h3>
                        <form>
                            <label>
                                Edad Gestacional:
                                <input type="text" />
                            </label>
                            <label>
                                Peso:
                                <input type="text" />
                            </label>
                            <label>
                                Talla:
                                <input type="text" />
                            </label>
                            <label>
                                Perimetro Cefálico:
                                <input type="text" />
                            </label>
                            <label>
                                Etnia:
                                <input type="text" />
                            </label>
                            <label>
                                Finaciamiento:
                                <input type="text" />
                            </label>
                            <label>
                                Código SIS:
                                <input type="text" />
                            </label>
                            <label>
                                Programa:
                                <input type="text" />
                            </label>
                            <button type="submit">Guardar Cambios</button>
                            <button type="button" onClick={onClose}>Cancelar</button>
                        </form>
                    </section>
                );
            case 'responsable':
                return (
                    <>
                        {paciente.id_responsable && (
                            <section className={`container-editar-responsable ${animateClass}`}>
                                <h3>DATOS DEL RESPONSABLE DEL PACIENTE</h3>
                                <form>
                                    <label>DNI:
                                        <input type="text" value={formData.dni_res}/>
                                    </label>
                                    <label >Paterno:
                                        <input type="text" value={formData.ape_paterno_res} />
                                    </label>
                                    <label >Materno:
                                        <input type="text" value={formData.ape_materno_res} />
                                    </label>
                                    <label>
                                        Nombres:
                                        <input type="text" value={formData.nombres_res} />
                                    </label>
                                    <label>Tipo Responsable:
                                        <select value={formData.tipo_res}>
                                            <option value="Madre">Madre</option>
                                            <option value="Padre">Padre</option>
                                            <option value="Hijo">Hijo</option>
                                            <option value="Otros">Otros</option>
                                        </select>
                                    </label>
                                    <label>Celular 1:
                                        <input type="text" value={formData.celular1_res}/>
                                    </label>
                                    <label>Celular 2:
                                        <input type="text" value={formData.celular2_res}/>
                                    </label>
                                    <label>Localidad:
                                        <input type="text" value={formData.localidad_res}/>
                                    </label>
                                    <label>Sector:
                                        <select value={formData.sector_res}>
                                            <option value="">Sin Sector</option>
                                            <option value="Sector 1">Sector 1</option>
                                            <option value="Sector 2">Sector 2</option>
                                        </select>
                                    </label>
                                    <label>
                                        Dirección:
                                        <input type="text" value={formData.direccion_res}/>
                                    </label>
                                    <label>
                                        Departamento:
                                        <input type="text" value={formData.departamento_res}/>
                                    </label>
                                    <label>Provincia:
                                        <input type="text" value={formData.provincia_res}/>
                                    </label>
                                    <label>Distrito:
                                        <input type="text" value={formData.distrito_res} />
                                    </label>
                                
                                    <button type="submit" >Guardar Cambios</button>
                                    <button type="button" onClick={onClose}>Cancelar</button>
                                </form>
                            </section>
                        )}
                    </>

                );
            case 'datos':
            default:
                return (
                    <section className={`container-editar-paciente ${animateClass}`}>
                        <h3>DATOS DEL PACIENTE</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                DNI:
                                <input type="text" value={formData.dni} onChange={handleChange} required />
                            </label>
                            <label>
                                Hist Clinico:
                                <input type="text" value={formData.hist_clinico} />
                            </label>
                            <label>
                                CNV en Linea:
                                <input type="text" value={formData.cnv_linea} />
                            </label>
                            <label>
                                Nombres:
                                <input type="text" value={formData.nombres} onChange={handleChange} required />
                            </label>
                            <label>
                                Apellido Paterno:
                                <input type="text" value={formData.ape_paterno} onChange={handleChange} required />
                            </label>
                            <label>
                                Apellido Materno:
                                <input type="text" value={formData.ape_materno} onChange={handleChange} required />
                            </label>
                            <label>
                                Fecha de Nacimiento:
                                <input type="date" value={formData.fecha_nacimiento} onChange={handleChange} required />
                            </label>
                            <label>
                                Edad:
                                <input value={formData.edad} onChange={handleChange} required />
                            </label>
                            <label>
                                Sexo:
                                <select name="sexo" value={formData.sexo} onChange={handleChange} required>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </label>
                            <button type="submit">Guardar Cambios</button>
                            <button type="button" onClick={onClose}>Cancelar</button>
                        </form>
                    </section>
                );
        }
    };

    return (
        <div className="editar-paciente">
            <OpcionesD pacienteDatos={paciente} />
            <NavLogin />
            <main>
                <section className='opcion-editar'>
                    <button
                        className={activeSection === 'datos' ? 'active' : ''}
                        onClick={() => handleButtonClick('datos')}
                    >
                        DATOS PACIENTE
                    </button>
                    <button
                        className={activeSection === 'nacimiento' ? 'active' : ''}
                        onClick={() => handleButtonClick('nacimiento')}
                    >
                        NACIMIENTO
                    </button>
                    {paciente.id_responsable && (
                        <button
                            className={activeSection === 'responsable' ? 'active' : ''}
                            onClick={() => handleButtonClick('responsable')}
                        >
                            ADULTO RESPONSABLE
                        </button>
                    )}
                </section>
                {renderSection()}
            </main>
            <NavPie />
        </div>
    );
};

export default EditPaciente;