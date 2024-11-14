import './Citas.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import Citas1 from './Citas1';
import HorasCita from '../Complementos/HorasCita';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdPersonSearch, MdOutlineInfo } from 'react-icons/md';

const OpcionesCita = () => {
    const [cita, setCita] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [citasData, setCitasData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [searching, setSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const agregarCita = (especialidad) => {
        setSelectedSpecialty(especialidad);
        setCita(!cita);
    };

    // Llamada inicial para citas cercanas de 3 días
    const fetchCitas = async (allDates = false) => {
        setLoading(true);
        const url = allDates 
            ? 'http://localhost:5000/api/filtrar-todas-citas-ninho'
            : 'http://localhost:5000/api/filtrar-cita-ninho-3';

        try {
            const response = await fetch(url);
            const data = await response.json();
            const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            setCitasData(sortedData);
        } catch (error) {
            console.error('Error fetching citasData:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCitas();
    }, []);

    // Filtrado combinado de citas según términos de búsqueda y fecha seleccionada
    const getFilteredCitas = () => {
        const search = searchTerm.trim().toLowerCase();
        
        return citasData.filter(cita => {
            const nombreCompleto = `${cita.nombres} ${cita.apellidos}`.toLowerCase();
            const apellidosCompleto = `${cita.apellidos} ${cita.nombres}`.toLowerCase();
            const fechaCita = new Date(cita.fecha).toLocaleDateString();

            const matchDate = !selectedDate || fechaCita === selectedDate;
            const matchSearch = !search || 
                nombreCompleto.includes(search) || 
                apellidosCompleto.includes(search) || 
                cita.dni.includes(search) ||
                cita.fecha.includes(search);

            return matchDate && matchSearch;
        });
    };

    const filteredCitas = getFilteredCitas();

    // Paginación de los datos filtrados
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCitas = filteredCitas.slice(startIndex, endIndex);

    const nextPage = () => endIndex < filteredCitas.length && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    // Controladores para los inputs
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = async (e) => {
        setSearchTerm(e.target.value);
        setSearching(true);
        await fetchCitas(true);  // Trae citas de todas las fechas
        setSearching(false);
    };

    return (
        <div className="opciones-cita">
            <NavLogin />
            <main>
                <h5>ESPECIALIDADES DISPONIBLES PARA CITAS</h5>
                <section>
                    <div className='box-citas'>
                        <Link to='/panel-niño' className='volver_link'>
                            <RiPlayReverseLargeFill /> Volver
                        </Link>

                        {Object.keys(HorasCita).map((key) => {
                            const { especialidad, icono: Icono } = HorasCita[key];

                            return (
                                <button key={key} className="box" onClick={() => agregarCita(especialidad)} >
                                    <Icono className='icon' />{especialidad}
                                </button>
                            );
                        })}
                    </div>
                </section>
                <div className="container-tabla">
                    <hr />
                    <p>CITAS PENDIENTES CERCANAS</p>
                    <div className="sub-contend">
                        <div className="box_buscar">
                            <input
                                type="text"
                                placeholder="Buscar por nombre, DNI o fecha..."
                                className="txt-buscar"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <MdPersonSearch className="ico_buscar" />
                            <input 
                                type="date" 
                                className='date-search' 
                                value={selectedDate || ''} 
                                onChange={handleDateChange} 
                            />
                            <MdOutlineInfo className='ico-info' />
                            <p className="msg-ico">Selecciona una fecha para buscar</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Nombre Paciente</th>
                                    <th>Nombre Médico</th>
                                    <th>Estado</th>
                                    <th>Motivo Cita</th>
                                    <th>Especialidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading || searching ? (
                                    <tr>
                                        <td colSpan="8">Buscando datos...</td>
                                    </tr>
                                ) : currentCitas.length > 0 ? (
                                    currentCitas.map((cita, index) => (
                                        <tr key={index}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{new Date(cita.fecha).toLocaleDateString()}</td>
                                            <td>{cita.hora}</td>
                                            <td>{cita.apellidos}, {cita.nombres}</td>
                                            <td>{cita.nombreMedico || 'Nombre Médico'}</td>
                                            <td>{cita.estado || 'Estado'}</td>
                                            <td>{cita.motivoConsulta}</td>
                                            <td>{cita.especialidad}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No hay citas cercanas</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Botones de paginación */}
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Ver menos
                        </button>
                        <button onClick={nextPage} disabled={endIndex >= filteredCitas.length}>
                            Ver más
                        </button>
                    </div>
                </div>
            </main>
            <NavPie />
            {cita && (
                <Citas1 especialidad={selectedSpecialty} agregarCita={agregarCita} />
            )}
        </div>
    );
}

export default OpcionesCita;
