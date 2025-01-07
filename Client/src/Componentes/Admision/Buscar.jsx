import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdPersonSearch } from 'react-icons/md';
import RegistrarPas from './RegisPaciente/RegPasciente';
import Registros from './GraficosRegistros/Registros';
import './buscar.css';
import { IoPersonAddSharp } from 'react-icons/io5';
import { FaUserEdit } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward, IoMdFemale, IoMdMale } from "react-icons/io";
import Menu from './Menu';

const Buscar = () => {
    const [showModal, setShowModal] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(15);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const navigate = useNavigate();
    const handleViewDato = (paciente) => {
        navigate(`/panel/${paciente.hist_clinico}`)
    };

    const obtenerPacientes = async (searchTerm = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/obtener/pacientes?searchTerm=${searchTerm}`);
            setPacientes(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            setLoading(false);
        }
    };

    const updateAllPatients = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/pacientes/actualizar-todos', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los datos de los pacientes');
            }

            const data = await response.json();
            alert(data.message);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar los datos de los pacientes');
        }
    };

    useEffect(() => {
        obtenerPacientes();
    }, [showModal]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        obtenerPacientes(e.target.value);
    };

    const calcularEdad = (fechaNacimiento) => {
        const fechaNac = new Date(fechaNacimiento);
        const fechaActual = new Date();
        const diferenciaMilisegundos = fechaActual.getTime() - fechaNac.getTime();
        const diasDiferencia = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
        const anios = Math.floor(diasDiferencia / 365);
        const meses = Math.floor((diasDiferencia % 365) / 30);
        const dias = Math.floor((diasDiferencia % 365) % 30);

        if (anios > 0) {
            return `${anios} año${anios > 1 ? 's' : ''} ${meses} mes${meses > 1 ? 'es' : ''}`;
        } else if (meses > 0) {
            return `${meses} mes${meses > 1 ? 'es' : ''} ${dias} día${dias > 1 ? 's' : ''}`;
        } else {
            return `${dias} día${dias > 1 ? 's' : ''}`;
        }
    };

    const indexOfLastPaciente = currentPage * resultsPerPage;
    const indexOfFirstPaciente = indexOfLastPaciente - resultsPerPage;
    const currentPacientes = pacientes.slice(indexOfFirstPaciente, indexOfLastPaciente);

    return (
        <div className="buscar">
            <h3 className='h3'>ADMISION - SAIS</h3>
            <div className="box_buscar">
                <input
                    type="text"
                    placeholder="Ingrese Cód, HC, Nombre o Responsable a Buscar"
                    className="buscar_input"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <MdPersonSearch className="ico_buscar" />
                <button onClick={toggleModal} className='btn-registrar-pas'>
                    <IoPersonAddSharp className='ico' /> REGIST. PACIENTE
                </button>
            </div>
            <main>
                <section className="box_resultados">
                    {loading ? (
                        <p>Cargando...</p>
                    ) : currentPacientes.length > 0 ? (
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
                                {currentPacientes.map((paciente, index) => (
                                    <tr key={index}>
                                        <td>{indexOfFirstPaciente + index + 1}</td>
                                        <td>{paciente.dni}</td>
                                        <td className='hist'>
                                            <Link to={`/panel/${paciente.hist_clinico}`} className='hist-clinico'>
                                                {paciente.hist_clinico}
                                            </Link>
                                        </td>
                                        <td>
                                            {paciente.sexo === 'Femenino' ? (
                                                <IoMdFemale className='ico' style={{ color: 'hotpink', marginRight: '5px', fontSize: '15px' }} />
                                            ) : (
                                                <IoMdMale className='ico' style={{ color: 'blue', marginRight: '5px', fontSize: '15px' }} />
                                            )}
                                            {paciente.ape_paterno} {paciente.ape_materno}, {paciente.nombres}
                                        </td>
                                        <td>{paciente.sexo}</td>
                                        <td>{new Date(paciente.fecha_nacimiento).toLocaleDateString()}</td>
                                        <td>{calcularEdad(paciente.fecha_nacimiento)}</td>
                                        <td>{paciente.tipo_paciente}</td>
                                        <td>
                                            <button onClick={() => handleViewDato(paciente)}>
                                                <FaUserEdit /> Ver datos
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                    <div className="paginacion">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <IoIosArrowBack />
                            Anterior
                        </button>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={indexOfLastPaciente >= pacientes.length}
                        >
                            Siguiente
                            <IoIosArrowForward />
                        </button>
                    </div>
                </section>
                <Menu />
            </main>
            <div className="graficos">
                <Registros />
            </div>
            <button className='btn-actual' onClick={updateAllPatients}>Actualizar Todos los Pacientes</button>
            {showModal && <RegistrarPas onClose={toggleModal} />}
        </div>
    );
};

export default Buscar;
