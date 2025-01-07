import React, { useState } from 'react';
import './personal.css';
import { Link, useNavigate } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import RegPersonal from './RegisPersonal/RegPersonal';
import EditPersonales from './EditPersonales/EditPersonales';
import Store from '../Store/Store_Cita_Turno';
import VerTurnos from './Turnos/VerTurnos';
import Informacion from './infoTurno/Informacion'
import UrlsApp from '../UrlsApp';
import { IoPersonAddSharp } from 'react-icons/io5';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdPersonSearch, MdMenuOpen } from 'react-icons/md';
import { FaUserEdit, FaMapMarkedAlt } from 'react-icons/fa';
import { AiFillSchedule } from "react-icons/ai";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoGear } from "react-icons/go";

const Personal = () => {
    const {apiUrl} = UrlsApp()
    const [verForm, setVerForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [personalToEdit, setPersonalToEdit] = useState(null);
    const [personalToToggle, setPersonalToToggle] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Número de registros por página
    const [openFiltro, setOpenFiltro] = useState(false);
    const [filterStatus, setFilterStatus] = useState('activo');
    const [verTurnos, setVerTurnos] = useState(false)
    const { personalSalud } = Store()
    const [info, setInfo] = useState(false)
    const [selectPer, setSelectPer] = useState(null)
    const navigate = useNavigate()

    const handleForm = () => {
        setVerForm(!verForm);
        setInfo(false)
    };
    const handleVerTurnos = () => {
        setVerTurnos(!verTurnos)
    }
    const handleInfo = (personal) => {
        setInfo(true)
        setSelectPer(personal)
    }

    // Filtrar la lista de personal según el término de búsqueda y el estado (activo/inactivo)
    const filteredPersonal = personalSalud.filter(personal => {
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
        setPersonalToEdit(personal);
        setIsModalOpen(true);
        setInfo(false)
    };

    // Función para cerrar el modal de edición
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setPersonalToEdit(null);
        setInfo(false)
        setSelectPer(null)
        setIsConfirmModalOpen(false); 
        setPersonalToToggle(null); 
    };

    // Función para abrir el modal de confirmación para activar/inactivar
    const handleToggleClick = (personal) => {
        setPersonalToToggle(personal);
        setIsConfirmModalOpen(true); 
        setInfo(false)
    };

    // Función para confirmar el cambio de estado (activar/inactivar)
    const handleConfirmToggle = async () => {
        try {
            const updatedEstado = personalToToggle.estado === 'activo' ? 'inactivo' : 'activo';
            const response = await fetch(`${apiUrl}/api/personal/actualizar-estado/${personalToToggle.id_personal}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: updatedEstado })
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado');
            }

            setIsConfirmModalOpen(false);  // Cerrar el modal
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            alert('No se pudo actualizar el estado. Intenta nuevamente.'); // Retroalimentación al usuario
        }
    };
    // Función para abrir/cerrar el filtro de estado
    const handleOpenFilter = () => {
        setOpenFiltro(!openFiltro);
    };

    // Función para cambiar el estado del filtro (activo/inactivo/todos)
    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    const openMap = () => {
        navigate('/maps-sais')
    }

    return (
        <div className="personal-salud">
            <NavLogin />
            <div className='sub-personal'>
                <h3 className='title-page'>LISTA DE PERSONAL DE SALUD ACTUAL</h3>
                <button className='open-form' onClick={handleForm}>
                    <IoPersonAddSharp /> Registrar Nuevo
                </button>
                <section>
                    <div className="box-buscar">
                        <Link to='/servicios-niño' className='volver_link'>
                            <RiPlayReverseLargeFill /> VOLVER
                        </Link>
                        <input
                            className='buscar-personal'
                            placeholder="Buscar por nombre, apellidos o DNI"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <MdPersonSearch className='ico_buscar' />
                        <button onClick={handleVerTurnos}>VER TURNOS <AiFillSchedule className="ico-verturnos" /></button>
                        <button onClick={openMap}><FaMapMarkedAlt style={{fontSize: '17px', marginTop: '-3px'}} />SECTORES</button>
                        <button className='btn-filtro' onClick={handleOpenFilter}>< MdMenuOpen className='ico' />Filtrar Datos</button>
                        {openFiltro && (
                            <div className="filtro">
                                <span onClick={() => handleFilterChange('todos')}>Todos</span>
                                <span onClick={() => handleFilterChange('activo')}>Activos</span>
                                <span onClick={() => handleFilterChange('inactivo')}>Inactivos</span>
                            </div>
                        )}
                        <GoGear className='config-ico' />
                    </div>
                    <p className='contador'> {filterStatus}: {filteredPersonal.length} de {personalSalud.length} </p>
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
                                <th style={{ textAlign: "center" }}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPersonal.length > 0 ? (
                                displayedPersonal.map((personal, index) => (
                                    <tr key={personal.id} className={personal.estado === 'inactivo' ? 'inactivo-row' : ''} >
                                        <td style={{ textAlign: 'center' }}>{index + indexOfFirstItem + 1}</td>
                                        <td>{personal.dni}</td>
                                        <td className='name' onClick={() => handleInfo(personal)}>{personal.paterno} {personal.materno}, {personal.nombres} </td>
                                        <td>{personal.tipo_user}</td>
                                        <td>{personal.profesion}</td>
                                        <td>{personal.servicio}</td>
                                        <td>{personal.especial_cita ? `${personal.especial_cita} - (${personal.num_consultorio})` : '-----'}</td>
                                        <td>{personal.condicion}</td>
                                        <td>{personal.celular}</td>
                                        <td className='accion'>
                                            <div>
                                                <button className={personal.estado === 'activo' ? 'activo' : 'inactivo'} onClick={() => handleToggleClick(personal)}>
                                                    {personal.estado === 'activo' ? 'Inactivar' : 'Activar'}
                                                    {personal.estado === 'activo' ? <FaXmark /> : <FaCheck />}
                                                </button>
                                                <button className='btn-edit' onClick={() => handleEditClick(personal)}>
                                                    <FaUserEdit />Editar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td style={{textAlign: 'center'}} colSpan="11">No hay resultados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="btns-pagina">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1} // Deshabilitar si está en la primera página
                        >
                            <IoIosArrowBack />
                            Ver Menos
                        </button>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={indexOfLastItem >= reversedPersonal.length} // Deshabilitar si ya no hay más elementos
                        >
                            Ver Más
                            <IoIosArrowForward />
                        </button>
                    </div>
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
                {info && (
                    <Informacion personals={selectPer} cerrarModal={handleCloseModal} />
                )}
                {isConfirmModalOpen && (
                    <div className="confirm-modal">
                        <div className={`content ${personalToToggle?.estado === 'activo' ? 'activo' : ''}`}>
                            <p>¿Está seguro de que desea <span>{personalToToggle?.estado === 'activo' ? 'inactivar' : 'activar'}</span>  a <br /> <span> {personalToToggle?.paterno} {personalToToggle?.materno}, {personalToToggle?.nombres}? </span></p>
                            <div className="btns">
                                <button className={`btn-save ${personalToToggle?.estado === 'activo' ? 'btn-delete' : ''}` } onClick={handleConfirmToggle}>{personalToToggle?.estado === 'activo' ? 'Inactivar' : 'Activar'} </button>
                                <button className='btn-cancela' onClick={handleCloseModal}>Cancelar</button>
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