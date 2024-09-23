import React, { useState, useEffect } from 'react';
import './Citas.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import HorasCita from '../Complementos/HorasCita';
import FormCita from './FormCitas';
import Citas2 from './Citas2'; 
import { TiUserAdd } from "react-icons/ti";

const Cita1 = ({ especialidad, agregarCita }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHora, setSelectedHora] = useState(null);
    const [citas, setCitas] = useState([]);
    const [consultorio1] = useState(1);
    const [consultorio2] = useState(2);
    const [verForm, setVerForm] = useState(false);
    const [personalList, setPersonalList] = useState([]);

    // Fetch para obtener personal de salud
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

    // Cambio de fecha
    const onDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split('T')[0];
        fetchCitas(formattedDate, especialidad, consultorio1); // Cambié `consultorio` por `consultorio1`
    };

    // Fetch para obtener citas según fecha, especialidad y consultorio
    const fetchCitas = async (fecha, especialidad, consultorio) => {
        try {
            const response = await fetch(`http://localhost:5000/api/citas-ninhos?fecha=${fecha}&especialidad=${especialidad}&consultorio=${consultorio}`);
            const data = await response.json();
            setCitas(data);  // Actualiza el estado de citas con los datos obtenidos
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    };

    // Filtrar los profesionales que coinciden con la especialidad seleccionada
    const profesionalesFiltrados = personalList.filter(profesional => profesional.especial_cita === especialidad);

    // Manejo de agregar cita
    const handleAgregarCita = (hora) => {
        setSelectedHora(hora);
        setVerForm(true);
    };

    const handleCloseForm = () => {
        setVerForm(false);
    };

    // Renderizar las filas de horarios
    const renderRow = (horario, index, turno) => {
        const citaActual = citas.find(cita => cita.hora === horario.hora);

        return (
            <tr key={horario.hora}>
                <td>{horario.hora}</td>
                <td>{turno}</td>
                <td>{citaActual ? citaActual.hisClinico : ''}</td>
                <td>{citaActual ? citaActual.dni : ''}</td>
                <td>{citaActual ? `${citaActual.apellidos}, ${citaActual.nombres}` : ''}</td>
                <td>{citaActual ? citaActual.edad : ''}</td>
                <td>{citaActual ? citaActual.fechaNacimiento : ''}</td>
                <td>{citaActual ? citaActual.telefono : ''}</td>
                {especialidad === 'Medicina' && <td>{citaActual ? citaActual.direccion : ''}</td>}
                {especialidad === 'Obstetricia_CPN' && <td>{citaActual ? citaActual.semEmbarazo : ''}</td>}
                {especialidad === 'Planificación' && <td>{citaActual ? citaActual.metodo : ''}</td>}
                <td>{citaActual ? citaActual.motivoConsulta : ''}</td>
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
                        <button className="btn btn-primary" onClick={() => handleAgregarCita(horario.hora)}>
                            <TiUserAdd />
                            AGREGAR CITA
                        </button>
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
                        value={selectedDate}
                        className="custom-calendar"
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
                            {HorasCita[especialidad]?.horarios.mañana.map((horario, index) => renderRow(horario, index, 'Mañana'))}
                            {HorasCita[especialidad]?.horarios.tarde.map((horario, index) => renderRow(horario, index, 'Tarde'))}
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
