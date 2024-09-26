import './Citas.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import Citas1 from './Citas1';
import HorasCita from '../Complementos/HorasCita'; 
import { RiPlayReverseLargeFill } from "react-icons/ri";

const OpcionesCita = () => {
    const [cita, setCita] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [citasData, setCitasData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const itemsPerPage = 10; // Número de citas por página

    const agregarCita = (especialidad) => {
        setSelectedSpecialty(especialidad);
        setCita(!cita); // Alternar la visualización del calendario
    };

    // Función para obtener las citas y ordenar por fecha
    const fetchCitas = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/filtrar-ninho-citas'); // Actualiza con la URL de tu API
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

    // Código para formatear la fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options); // Cambia 'es-ES' por tu locale preferido
    };

    // Cálculo de los datos filtrados para la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCitas = citasData.slice(startIndex, endIndex);

    // Funciones para cambiar de página
    const nextPage = () => {
        if (endIndex < citasData.length) {
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
                                        {/* <td>{formatDate(cita.fecha)}</td> */}
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
                        <button onClick={nextPage} disabled={endIndex >= citasData.length}>
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
