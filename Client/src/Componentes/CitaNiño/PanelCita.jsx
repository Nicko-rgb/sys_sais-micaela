import './panelCita.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdPersonSearch, MdOutlineInfo } from 'react-icons/md';
import axios from 'axios';
import { TbNurse } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdPsychology } from "react-icons/md";
import { FaTooth, FaCalendarAlt, FaBaby } from 'react-icons/fa';
import { LiaNutritionix } from "react-icons/lia";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const OpcionesCita = () => {
    const [citasData, setCitasData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate()

    const handleCita = (especialidad) => {
        navigate(`/cita-niño/${especialidad}`, { state: { especialidad } });
    };

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

    const [especialidades, setEspecialidades] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/especialidad-unico-nino')
            .then(response => {
                setEspecialidades(response.data);
            })
            .catch(error => {
                console.error("Error al obtener los horarios:", error);
            });
    }, []);

    // Filtrado de citas según el término de búsqueda y la fecha seleccionada
    const getFilteredCitas = () => {
        const search = searchTerm.trim().toLowerCase();

        return citasData.filter(cita => {
            const fullName = `${cita.nombres} ${cita.ape_paterno} ${cita.ape_materno}`.toLowerCase();
            const reverseName = `${cita.ape_paterno} ${cita.ape_materno} ${cita.nombres}`.toLowerCase();
            const normalizedSearchTerm = searchTerm.trim().toLowerCase().replace(/\s+/g, ' ');
            
            
            const matchDate = !searchDate || new Date(cita.fecha).toISOString().split('T')[0] === new Date(searchDate).toISOString().split('T')[0];
            const matchSearch = !search ||
                fullName.includes(normalizedSearchTerm) ||
                reverseName.includes(normalizedSearchTerm) ||
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
    const handleDateChange = async (e) => {
        const date = e.target.value;
        setSearchDate(date);
        if (!date && !searchTerm) {
            await fetchCitas(false);
        } else {
            await fetchCitas(true);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (!term && !searchDate) {
            await fetchCitas(false);
        } else {
            await fetchCitas(true);
        }
        setCurrentPage(1);
    };

    const iconMap = {
        "Obstetricia_CPN": <FaBaby />,
        "Odontología": <FaTooth />,
        "Psicología": <MdPsychology />,
        "Nutrición": <LiaNutritionix />,
        "Medicina": <FaUserDoctor />,
        "Enfermería": <TbNurse />,
        "Planificación": <FaCalendarAlt />
    };

    //creamos una funcion para recortar un texto
    const recortarTexto = (texto) => {
        if (texto.length > 20) {
            return texto.substring(0, 20) + '...';
        }
        return texto
    }

    const fActual = new Date()        

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

                        {especialidades.map((especialidad, index) => {
                            const icon = iconMap[especialidad.especialidad] || null; // Obtiene el ícono o null si no existe
                            return (
                                <button key={index}
                                    className='box'
                                    onClick={() => handleCita(especialidad.especialidad)}>
                                    {icon} {/* Renderiza el ícono */}
                                    {especialidad.especialidad}
                                </button>
                            );
                        })}
                    </div> 
                </section>
                <div className="container-tabla">
                    <hr />
                    <p>CITAS PENDIENTES CERCANAS - {new Date(fActual).toLocaleDateString()}</p>
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
                                value={searchDate}
                                onChange={handleDateChange}
                            />
                            <MdOutlineInfo className='ico-info' />
                            <p className="msg-ico">Selecione una fecha.</p>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Nombre Paciente</th>
                                    <th>Profesional</th>
                                    <th>Estado</th>
                                    <th>Motivo Cita</th>
                                    <th>Especialidad</th>
                                    <th>Consultorio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="9">Buscando datos...</td>
                                    </tr>
                                ) : currentCitas.length > 0 ? (
                                    currentCitas.map((cita, index) => (
                                        <tr key={index}>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{new Date(cita.fecha).toLocaleDateString()}</td>
                                            <td>{cita.hora}</td>
                                            <td>{cita.ape_paterno} {cita.ape_materno} , {cita.nombres}</td>
                                            <td>{cita.profesional_cita || 'Nombre Médico'}</td>
                                            <td>{cita.estado || 'Estado'}</td>
                                            <td>{recortarTexto(cita.motivoConsulta)}</td>
                                            <td>{cita.especialidad}</td>
                                            <td>{cita.consultorio}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9">No hay citas cercanas</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Botones de paginación */}
                    <div className="btns-pagina">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            <IoIosArrowBack />
                            Ver menos
                        </button>
                        <button onClick={nextPage} disabled={endIndex >= filteredCitas.length} >
                            Ver más
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </main>
            <NavPie />
        </div>
    );
}

export default OpcionesCita;