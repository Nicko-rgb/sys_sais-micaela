import React, { useState, useEffect } from 'react';
import './personal.css';
import { Link } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import RegPersonal from '../Formularios/RegPersonal';
import EditPersonales from './EditPersonales/EditPersonales';
import VerTurnos from './Turnos/VerTurnos';
import { IoPersonAddSharp } from 'react-icons/io5';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdPersonSearch } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { MdMenuOpen } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";


const Personal = () => {
    const [verForm, setVerForm] = useState(false);
    const [personalList, setPersonalList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para controlar el modal de edición
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Modal de confirmación
    const [personalToEdit, setPersonalToEdit] = useState(null); // Estado para almacenar el personal seleccionado
    const [personalToToggle, setPersonalToToggle] = useState(null); // Estado para el personal a activar/inactivar
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const itemsPerPage = 10; // Número de registros por página
    const [openFiltro, setOpenFiltro] = useState(false); // Estado para controlar el filtro desplegable
    const [filterStatus, setFilterStatus] = useState('activo'); // Estado para filtrar por activo/inactivo/todos
    const [verTurnos, setVerTurnos] = useState(false)

    const handleForm = () => {
        setVerForm(!verForm);
    };
    const handleVerTurnos = () => {
        setVerTurnos(!verTurnos)
    }
    // Obtener la lista de personal desde el backend
    const fetchPersonal = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/obtener/personal-salud');
            const data = await response.json();
            setPersonalList(data);
        } catch (error) {
            console.error('Error al obtener el personal:', error);
        }
    };

    useEffect(() => {
        fetchPersonal(); // Carga inicial de datos
        const intervalId = setInterval(fetchPersonal, 5000); // Polling cada 5 segundos
        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    // Filtrar la lista de personal según el término de búsqueda y el estado (activo/inactivo)
    const filteredPersonal = personalList.filter(personal => {
        const fullName = `${personal.paterno} ${personal.materno} ${personal.nombres}`.toLowerCase();
        const searchTerms = searchTerm.toLowerCase().split(" "); // Dividir términos de búsqueda
        const matchSearch = searchTerms.every(term =>
            fullName.includes(term) || personal.dni.includes(term)
        );
        const matchStatus = filterStatus === 'todos' || personal.estado === filterStatus;
        return matchSearch && matchStatus;
    });

    // Invertir el orden de los resultados filtrados
    const reversedPersonal = filteredPersonal.reverse();

    // Calcular los índices de inicio y fin para la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Limitar los resultados mostrados según la página actual
    const displayedPersonal = reversedPersonal.slice(indexOfFirstItem, indexOfLastItem);

    // Función para abrir el modal de edición
    const handleEditClick = (personal) => {
        setPersonalToEdit(personal);  // Guardar el personal seleccionado
        setIsModalOpen(true);  // Abrir el modal de edición
    };

    // Función para cerrar el modal de edición
    const handleCloseModal = () => {
        setIsModalOpen(false);  // Cerrar el modal
        setPersonalToEdit(null);  // Limpiar el estado del personal seleccionado
    };

    // Función para abrir el modal de confirmación para activar/inactivar
    const handleToggleClick = (personal) => {
        setPersonalToToggle(personal); // Guardar el personal a activar/inactivar
        setIsConfirmModalOpen(true);  // Abrir el modal de confirmación
    };

    // Función para confirmar el cambio de estado (activar/inactivar)
    const handleConfirmToggle = async () => {
        try {
            const updatedEstado = personalToToggle.estado === 'activo' ? 'inactivo' : 'activo';
            const response = await fetch(`http://localhost:5000/api/personal/actualizar-estado/${personalToToggle.id_personal}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: updatedEstado })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado');
            }

            fetchPersonal(); // Refrescar la lista
            setIsConfirmModalOpen(false);  // Cerrar el modal
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            alert('No se pudo actualizar el estado. Intenta nuevamente.'); // Retroalimentación al usuario
        }
    };

    // Función para cerrar el modal de confirmación
    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);  // Cerrar el modal
        setPersonalToToggle(null);  // Limpiar el estado
    };

    // Función para abrir/cerrar el filtro de estado
    const handleOpenFilter = () => {
        setOpenFiltro(!openFiltro);
    };

    // Función para cambiar el estado del filtro (activo/inactivo/todos)
    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    return (
        <div className="personal-salud">
            <NavLogin />
            <div className='sub-personal'>
                <h3>LISTA DE PERSONAL DE SALUD ACTUAL</h3>
                <div className='div-btn'>
                    <button className='open-form' onClick={handleForm}>
                        <IoPersonAddSharp /> REGISTRAR NUEVO
                    </button>
                </div>
                <section>
                    <div className="box-buscar">
                        <Link to='/panel-niño' className='volver_link'>
                            <RiPlayReverseLargeFill /> VOLVER
                        </Link>
                        <MdPersonSearch className='ico_buscar' />
                        <input
                            className='buscar-personal'
                            placeholder="Buscar por nombre, apellidos o DNI"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleVerTurnos}>VER TURNOS <AiFillSchedule className="ico-verturnos" /></button>
                        <p className='btn-filtro' onClick={handleOpenFilter}>< MdMenuOpen className='ico' />Filtrar Datos</p>
                        {openFiltro && (
                            <div className="filtro">
                                <span onClick={() => handleFilterChange('todos')}>Todos</span>
                                <span onClick={() => handleFilterChange('activo')}>Activos</span>
                                <span onClick={() => handleFilterChange('inactivo')}>Inactivos</span>
                            </div>
                        )}
                    </div>
                    {filteredPersonal.length > 0 ? (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>DNI</th>
                                        <th>Apellidos y Nombres</th>
                                        <th>Tipo</th>
                                        <th>Profesión</th>
                                        <th>Servicio</th>
                                        <th>Especialidad en Citas</th>
                                        <th>Condición</th>
                                        <th>Celular</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedPersonal.map((personal, index) => (
                                        <tr key={personal.id} className={personal.estado === 'inactivo' ? 'inactivo-row' : ''} >
                                            <td style={{ textAlign: 'center' }}>{index + indexOfFirstItem + 1}</td>
                                            <td>{personal.dni}</td>
                                            <td>{personal.paterno} {personal.materno}, {personal.nombres} </td>
                                            <td>{personal.tipo_user}</td>
                                            <td>{personal.profesion}</td>
                                            <td>{personal.servicio}</td>
                                            <td>{personal.especial_cita || '----'}</td>
                                            <td>{personal.condicion}</td>
                                            <td>{personal.celular}</td>
                                            <td className='btns'>
                                                <div>
                                                    <button onClick={() => handleToggleClick(personal)}>
                                                        {personal.estado === 'activo' ? 'Inactivar' : 'Activar'}
                                                    </button>
                                                    <button onClick={() => handleEditClick(personal)}>
                                                        <FaUserEdit />Editar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="pagination">
                                <div className="pagination-buttons">
                                    {currentPage > 1 && (
                                        <>
                                            <button onClick={() => setCurrentPage(currentPage - 1)}>Ver Menos</button>
                                            <button onClick={() => setCurrentPage(currentPage + 1)}>Ver Más</button>
                                        </>
                                    )}
                                    {indexOfLastItem < reversedPersonal.length && (
                                        <>
                                            <button onClick={() => setCurrentPage(currentPage - 1)}>Ver Menos</button>
                                            <button onClick={() => setCurrentPage(currentPage + 1)}>Ver Más</button>
                                        </>
                                    )}
                                </div>
                            </div>


                        </>
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '20px', width: '93vw' }}>
                            No se encontraron resultados.
                        </p>
                    )}
                </section>

                {verForm && (
                    <RegPersonal handleForm={handleForm} />
                )}

                {isModalOpen && (
                    <EditPersonales
                        personData={personalToEdit}
                        onSave={() => { console.log("Personal actualizado."); handleCloseModal(); }}
                        onClose={handleCloseModal}
                    />
                )}
                {verTurnos && (
                    <VerTurnos closeTurnos={handleVerTurnos} />
                )}

                {isConfirmModalOpen && (
                    <div className="confirm-modal">
                        <div className="content">
                            <p>¿Está seguro de que desea {personalToToggle?.estado === 'activo' ? 'inactivar' : 'activar'} a <span> {personalToToggle?.paterno} {personalToToggle?.materno}, {personalToToggle?.nombres}? </span></p>
                            <div className="btns-confirm">
                                <button className='btn-save' onClick={handleConfirmToggle}>Confirmar</button>
                                <button className='btn-cancel' onClick={handleCloseConfirmModal}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <NavPie />
        </div>
    );
};

export default Personal;