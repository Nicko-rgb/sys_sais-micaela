import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdPersonSearch } from 'react-icons/md';
import RegistrarPas from '../Formularios/RegPasciente';
import EditPaciente from "../Her_Pacien_Ninho/EditPaciente"
import './buscar.css';
import { IoPersonAddSharp } from 'react-icons/io5';
import { FaUserEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoMdFemale, IoMdMale  } from "react-icons/io";

const Buscar = () => {
    const [showModal, setShowModal] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [openEdit, setEdit] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null); //ESTADO PARA ALMACENAR AL PACIDNTE
    const navegate= useNavigate()

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const abrirEdit = (paciente) => {
        setSelectedPaciente(paciente); // Guardar el paciente seleccionado en el estado
        navegate(`/panel/${paciente.hist_clinico}`)
        setEdit(true)
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


    //codigo para actualizar la edad y tipo de paciente 
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
            alert(data.message); // Muestra un mensaje de éxito
            window.location.reload()

        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar los datos de los pacientes');
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
                <h3>LISTADO DE TODO LOS PACIENTES REGISTRADOS</h3>
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
                                    <th style={{ textAlign: "center" }}>DNI</th>
                                    <th>Historia Clínica</th>
                                    <th style={{ textAlign: "center" }}>Nombres</th>
                                    <th style={{ textAlign: "center" }}>Sexo</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th style={{ textAlign: "center" }}>Edad</th>
                                    <th style={{ textAlign: "center" }}>Tipo</th>
                                    <th style={{ textAlign: "center" }}>Acción</th>
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
                                        <td>
                                        
                                        {/* Mostrar ícono basado en el sexo */}
                                        {paciente.sexo === 'Femenino' ? (
                                            <IoMdFemale style={{ color: 'hotpink', marginRight: '5px', fontSize: '15px' }} />
                                        ) : (
                                            <IoMdMale  style={{ color: 'blue', marginRight: '5px', fontSize: '15px' }} />
                                        )}
                                        {paciente.ape_paterno} {paciente.ape_materno}, {paciente.nombres}
                                    </td>
                                        <td>{paciente.sexo} </td>
                                        <td>{new Date(paciente.fecha_nacimiento).toLocaleDateString()}</td>
                                        <td>{calcularEdad(paciente.fecha_nacimiento)}</td>
                                        <td>{paciente.tipo_paciente} </td>
                                        <td>
                                            {/* <button onClick={abrirEdit(paciente)}><FaUserEdit /> Editar</button> */}
                                            <button onClick={() => abrirEdit(paciente)}><FaUserEdit /> Ver datos  </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No se encontraron resultados.</p>
                    )}
                </section>
                <button onClick={updateAllPatients}>Actualizar Todos los Pacientes</button>
            </div>
            {showModal && <RegistrarPas onClose={toggleModal} />}
            {openEdit &&selectedPaciente && <EditPaciente paciente={selectedPaciente} onClose={() => setEdit(false)} />}
        </div>
    );
};

export default Buscar;