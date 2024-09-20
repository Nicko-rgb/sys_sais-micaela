import React, { useState, useEffect } from 'react';
import './personal.css';
import { Link } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import RegPersonal from '../Formularios/RegPersonal';
import EditPersonales from './EditPersonales/EditPersonales'; // Asegúrate de importar tu modal aquí
import { IoPersonAddSharp } from 'react-icons/io5';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdPersonSearch } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';

const Personal = () => {
    const [verForm, setVerForm] = useState(false);
    const [personalList, setPersonalList] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para controlar el modal
    const [personalToEdit, setPersonalToEdit] = useState(null); // Estado para almacenar el personal seleccionado

    const handleForm = () => {
        setVerForm(!verForm);
    };

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

    // Filtrar la lista de personales según el término de búsqueda
    const filteredPersonal = personalList.filter(personal => {
        const fullName = `${personal.paterno} ${personal.materno} ${personal.nombres}`.toLowerCase();
        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            personal.dni.includes(searchTerm)
        );
    });

    // Limitar los resultados mostrados
    const displayedPersonal = showAll ? filteredPersonal : filteredPersonal.slice(0, 10);

    // Función para abrir el modal y pasar los datos del personal seleccionado
    const handleEditClick = (personal) => {
        setPersonalToEdit(personal);  // Guardar el personal seleccionado
        setIsModalOpen(true);  // Abrir el modal
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);  // Cerrar el modal
        setPersonalToEdit(null);  // Limpiar el estado del personal seleccionado
    };

    // Función para guardar los cambios
    const handleSave = (updatedPersonal) => {
        // Aquí puedes actualizar la lista del personal con los cambios realizados
        console.log("Personal actualizado:", updatedPersonal);
        setIsModalOpen(false);  // Cierra el modal al guardar
    };

    return (
        <div className="personal-salud">
            <NavLogin />
            <div className='sub-personal'>
                <h3>LISTA DE PERSONAL DE SALUD</h3>
                <div className='div-btn'>
                    <button className='open-form' onClick={handleForm}>
                        <IoPersonAddSharp /> REGISTRAR NUEVO
                    </button>
                </div>
                <section>
                    <Link to='/panel-niño' className='volver_link'>
                        <RiPlayReverseLargeFill /> VOLVER
                    </Link>
                    <div className="box-buscar">
                        <MdPersonSearch className='ico_buscar' />
                        <input
                            className='buscar-personal'
                            placeholder="Buscar por nombre, apellidos o DNI"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {filteredPersonal.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>DNI</th>
                                    <th>Apellidos</th>
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Profesión</th>
                                    <th>Servicio</th>
                                    <th>Condición</th>
                                    <th>Celular</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedPersonal.map((personal, index) => (
                                    <tr key={personal.id}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>{personal.dni}</td>
                                        <td>{personal.paterno} {personal.materno}</td>
                                        <td>{personal.nombres}</td>
                                        <td>{personal.tipo_user}</td>
                                        <td>{personal.profesion}</td>
                                        <td>{personal.servicio}</td>
                                        <td>{personal.condicion}</td>
                                        <td>{personal.celular}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(personal)}>
                                                <FaUserEdit />Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '20px', width: '93vw' }}>
                            No se encontraron resultados.
                        </p>
                    )}

                    {filteredPersonal.length > 10 && (
                        <button onClick={() => setShowAll(!showAll)}> {showAll ? 'Ver Menos' : 'Ver Más'} </button>
                    )}
                </section>
            </div>

            {verForm && (
                <RegPersonal handleForm={handleForm} />
            )}

            {isModalOpen && (
                <EditPersonales
                    personData={personalToEdit} // Pasar los datos del personal seleccionado
                    onSave={handleSave}  // Pasar la función para guardar los cambios
                    onClose={handleCloseModal}  // Pasar la función para cerrar el modal
                />
            )}

            <NavPie />
        </div>
    );
};

export default Personal;
