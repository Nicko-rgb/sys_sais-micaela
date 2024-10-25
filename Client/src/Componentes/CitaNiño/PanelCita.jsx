import './Citas.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import Citas1 from './Citas1';
import HorasCita from '../Complementos/HorasCita'; 
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdPersonSearch } from 'react-icons/md';
import { IoMdFemale, IoMdMale } from "react-icons/io";


const OpcionesCita = () => {
    const [cita, setCita] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [citasData, setCitasData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 10; // Número de citas por página

    const agregarCita = (especialidad) => {
        setSelectedSpecialty(especialidad);
        setCita(!cita); // Alternar la visualización del calendario
    };

    // Función para obtener las citas y ordenar por fecha
    const fetchCitas = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/filtrar-ninho-citas');
            const data = await response.json();
            
            // Ordenar las citas por fecha (las más cercanas primero)
            const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            
            setCitasData(sortedData);
        } catch (error) {
            console.error('Error fetching citasData:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Llamar a fetchCitas por primera vez
        fetchCitas();

        // Actualizar cada 30 segundos sin recargar la página
        const intervalId = setInterval(fetchCitas, 3000); // 3 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    // Cálculo de los datos filtrados según el término de búsqueda
    const filteredCitas = citasData.filter(cita => {
        const search = searchTerm.trim().toLowerCase();
 
        // Si el término de búsqueda está vacío, no filtrar
        if (!search) return true;

        const nombresCompleto = `${cita.nombres} ${cita.apellidos}`.toLowerCase().replace(/\s+/g, ' ').trim();
        const apellidosCompleto = `${cita.apellidos} ${cita.nombres}`.toLowerCase().replace(/\s+/g, ' ').trim();

        // Verifica si el término de búsqueda aparece en el nombre completo o el apellido completo, sin importar el orden
        return (
            nombresCompleto.includes(search) ||
            apellidosCompleto.includes(search) ||
            cita.dni.includes(search) ||  // Búsqueda por DNI
            cita.fecha.includes(search)   // Búsqueda por fecha
        );
    });

    // Paginación de los datos filtrados
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCitas = filteredCitas.slice(startIndex, endIndex);

    // Funciones para cambiar de página
    const nextPage = () => {
        if (endIndex < filteredCitas.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
                    <div className="box_buscar">
                        <MdPersonSearch className="ico_buscar" />
                        <input
                            type="text"
                            placeholder="Ingrese Nombre, DNI o Fecha de cita"
                            className="buscar_input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
                        />
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
                            {loading ? (
                                <tr>
                                    <td colSpan="8">Cargando citas...</td>
                                </tr>
                            ) : (
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
                            )}
                        </tbody>
                    </table>

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
