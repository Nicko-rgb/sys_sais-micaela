import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdPersonSearch } from 'react-icons/md';
import RegistrarPas from '../Formularios/RegPasciente';
import './buscar.css';
import { IoPersonAddSharp } from 'react-icons/io5';
import { FaUserEdit } from 'react-icons/fa';

const Buscar = () => {
    const [showModal, setShowModal] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const obtenerPacientes = async (searchTerm = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/obtener/pacientes?searchTerm=${searchTerm}`);
            setPacientes(response.data); // Establecer todos los pacientes
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerPacientes(); // Obtener pacientes al montar el componente
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        obtenerPacientes(e.target.value); // Buscar pacientes al cambiar el término de búsqueda
    };

    const calcularEdad = (fechaNacimiento) => {
        const fechaNac = new Date(fechaNacimiento);
        const fechaActual = new Date(); 
    
        // Calcular la diferencia en milisegundos
        const diferenciaMilisegundos = fechaActual.getTime() - fechaNac.getTime();
    
        // Convertir a días
        const diasDiferencia = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    
        // Calcular años, meses y días
        const anios = Math.floor(diasDiferencia / 365);
        const meses = Math.floor((diasDiferencia % 365) / 30);
        const dias = Math.floor((diasDiferencia % 365) % 30);
    
        // Devolver la edad en el formato adecuado
        if (anios > 0) {
            return `${anios} año${anios > 1 ? 's' : ''} ${meses} mes${meses > 1 ? 'es' : ''}`;
        } else if (meses > 0) {
            return `${meses} mes${meses > 1 ? 'es' : ''} ${dias} día${dias > 1 ? 's' : ''}`;
        } else {
            return `${dias} día${dias > 1 ? 's' : ''}`;
        }
    };

    return (
        <div className="buscar">
            <div className="sub_buscar">
                <h3>Listado de Todos los Pacientes Registrados</h3>
                <main>
                    <div className="box_buscar">
                        <MdPersonSearch className="ico_buscar" />
                        <input
                            type="text"
                            placeholder="Ingrese Cód, HC, Nombre o Responsable a Buscar"
                            className="buscar_input"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button onClick={toggleModal} className='btn-registrar-pas'>
                        <IoPersonAddSharp className='ico' /> REGIST. PACIENTE
                    </button>
                </main>
                <hr />
                <section className="box_resultados">
                    {loading ? (
                        <p>Cargando...</p>
                    ) : pacientes.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>DNI</th>
                                    <th>Historia Clínica</th>
                                    <th>Nombres</th>
                                    <th>Sexo</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Edad</th>
                                    <th>Tipo</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pacientes.map((paciente, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{paciente.dni}</td>
                                        <td>
                                            <Link to={`/panel/${paciente.hist_clinico}`} className='hist-clinico'>
                                                {paciente.hist_clinico}
                                            </Link>
                                        </td>
                                        <td>{paciente.ape_paterno} {paciente.ape_materno}, {paciente.nombres}</td>
                                        <td>{paciente.sexo} </td>
                                        <td>{new Date(paciente.fecha_nacimiento).toLocaleDateString()}</td>
                                        <td>{calcularEdad(paciente.fecha_nacimiento)}</td>
                                        <td>{paciente.tipo_paciente} </td>
                                        <td>
                                            <button><FaUserEdit /> Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </section>
            </div>
            {showModal && <RegistrarPas onClose={toggleModal} />}
        </div>
    );
};

export default Buscar;