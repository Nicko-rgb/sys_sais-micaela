import React, { useState, useEffect } from 'react';
import './Citas.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import HorasCita from '../Complementos/HorasCita';
import FormCita from './FormCitas';
import Citas2 from './Citas2';

const Cita1 = ({ especialidad, agregarCita }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHora, setSelectedHora] = useState(null);
    const [citas, setCitas] = useState([]);
    const [consultorio1] = useState(1);
    const [consultorio2] = useState(2);
    const [verForm, setVerForm] = useState(false);
    const [personalList, setPersonalList] = useState([]);

    // Fetch para obtener personal
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
        fetchPersonal();
    }, []);

    // Filtrar los profesionales que coinciden con la especialidad seleccionada
    const profesionalesFiltrados = personalList.filter(profesional => profesional.especial_cita === especialidad);

    // Cambio de fecha
    const onDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split('T')[0];
        fetchCitas(formattedDate);
    };

    // Fetch para obtener citas (simulación con datos mock)
    const fetchCitas = (fecha) => {
        const citasPorFecha = [
            { fecha: '2024-09-10', hora: '07:30 - 08:15', paciente: 'Paciente 1', observaciones: 'Consulta general' },
            { fecha: '2024-09-10', hora: '08:15 - 09:00', paciente: 'Paciente 2', observaciones: 'Chequeo' },
        ];
        const citasFiltradas = citasPorFecha.filter(cita => cita.fecha === fecha);
        setCitas(citasFiltradas);
    };

    // Manejo de agregar cita
    const handleAgregarCita = (hora) => {
        setSelectedHora(hora);
        setVerForm(true);
    };

    const handleCloseForm = () => {
        setVerForm(false);
    };

    // Renderizar las filas de horarios y manejar Atención Especial y recesos
    const renderRow = (horario, index, horarios) => {
        const citaActual = citas.find(cita => cita.hora === horario.hora);
        const esAtencionEspecial = horario.AtencionEspecial;
        const esReceso = horario.receso;
    
        let rowClass = '';
        let turno = 'Mañana'; // Por defecto, antes del receso es "Mañana"
    
        // Verificamos si el receso ya ocurrió
        const recesoIndex = horarios.findIndex(h => h.receso); // Encontrar el índice del receso
        if (recesoIndex !== -1 && index > recesoIndex) {
            turno = 'Tarde'; // Si estamos después del receso, el turno será "Tarde"
        }
    
        if (esAtencionEspecial) {
            rowClass = 'atencion-especial'; // Clase CSS para Atención Especial
        } else if (esReceso) {
            rowClass = 'receso'; // Clase CSS para recesos
        }
    
        // Renderización de las filas de Atención Especial con todas las columnas
        if (esAtencionEspecial) {
            return horario.AtencionEspecial.map((especial, especialIndex) => (
                <tr key={`especial-${especialIndex}`} className={rowClass}>
                    <td>{especial.hora}</td>
                    <td>{turno}</td> {/* Mostrar el turno aquí */}
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td></td>
                    {especialidad === 'Medicina' && <td> </td>}
                    {especialidad === 'Obstetricia_CPN' && <td> </td>}
                    {especialidad === 'Planificación' && <td> </td>}
                    <td> </td>
                    <td>
                        {profesionalesFiltrados.length > 0 ? (
                            profesionalesFiltrados.map((profesional) => (
                                <span key={profesional.id}>
                                    {profesional.nombres} {profesional.paterno}
                                </span>
                            ))
                        ) : (
                            <span>No disponible</span>
                        )}
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={() => handleAgregarCita(especial.hora)}>
                            AGREGAR CITA
                        </button>
                    </td>
                </tr>
            ));
        }
    
        // Renderización de la fila de receso con colSpan="9"
        if (esReceso) {
            return (
                <tr key={horario.receso} className={rowClass}>
                    <td>{`${horario.receso}`}</td> 
                    <td colSpan="10">RECESO</td>
                </tr>
            );
        }
    
        // Renderización de filas normales
        return (
            <tr key={horario.hora} className={rowClass}>
                <td>{horario.hora}</td>
                <td>{turno}</td> {/* Mostrar el turno aquí */}
                <td></td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td></td>
                {especialidad === 'Medicina' && <td> </td>}
                {especialidad === 'Obstetricia_CPN' && <td> </td>}
                {especialidad === 'Planificación' && <td> </td>}
                <td> </td>
                <td>
                    {profesionalesFiltrados.length > 0 ? (
                        profesionalesFiltrados.map((profesional) => (
                            <span key={profesional.id}>
                                {profesional.nombres} {profesional.paterno}
                            </span>
                        ))
                    ) : (
                        <span>No disponible</span>
                    )}
                </td>
                <td>
                    {citaActual ? (
                        <button className="btn btn-danger">CANCELAR CITA</button>
                    ) : (
                        <button className="btn btn-primary" onClick={() => handleAgregarCita(horario.hora)}>AGREGAR CITA</button>
                    )}
                </td>
            </tr>
        );
    };
    
    

    return (
        <div className="calendar-cita">
            <NavLogin />
            <main>
                {especialidad && <h3>CITA PARA EL NIÑO ({especialidad})</h3>}
                <div className='box-calendar'>
                    <p>Selecciona una fecha para ver o agregar citas</p>
                    <Calendar
                    onChange={onDateChange}
                    className="custom-calendar"
                    tileClassName={({ date, view }) => {
                        if (view === 'month' && date.getDay() === 0) {
                            return 'react-calendar__tile--sunday'; // Aplica la clase para los domingos
                        }
                        return null; // No aplica clase para otros días
                    }}
                />
                </div>
                <hr />
                <div className='list-cita'>
                    <h4>Citas para el día {selectedDate.toISOString().split('T')[0]} en consultorio {consultorio1} - {especialidad}</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Turno</th>
                                <th>Hist. Clínica</th>
                                <th>DNI</th>
                                <th>Apellidos y Nombres</th>
                                <th>Edad</th>
                                <th>Fec. Nacimiento</th>
                                <th>Celular</th>
                                {especialidad === 'Medicina' && <th>Dirección</th>}
                                {especialidad === 'Obstetricia_CPN' && <th>Sem. de Embarazo</th>}
                                {especialidad === 'Planificación' && <th>Método Planificación</th>}
                                <th>Motivo Consulta</th>
                                <th>Prof Responsable</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HorasCita[especialidad]?.map(renderRow)}
                        </tbody>
                    </table>
                </div>

                {['Enfermería', 'Medicina', 'Odontología', 'Obstetricia_CPN'].includes(especialidad) ? (
                    <Citas2
                        fecha={selectedDate.toISOString().split('T')[0]}
                        especialidad={especialidad}
                        consultorio2={consultorio2}
                        citas={citas}
                        personal={profesionalesFiltrados}
                    />
                ) : (<p style={{ textAlign: 'center' }}>No hay Consultorio 2</p>)}

                <button className='close-cita' onClick={agregarCita}>CERRAR TABLAS CITA</button>
            </main>
            <NavPie />

            {verForm && (
                <FormCita
                    handleCloseForm={handleCloseForm}
                    hora={selectedHora}
                    fecha={selectedDate.toISOString().split('T')[0]}
                    especialidad={especialidad}
                    consultorio={consultorio1}
                />
            )}
        </div>
    );
};

export default Cita1;
