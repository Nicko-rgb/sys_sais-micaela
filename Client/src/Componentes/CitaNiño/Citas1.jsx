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

    const onDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split('T')[0];
        fetchCitas(formattedDate);
    };

    const fetchCitas = (fecha) => {
        const citasPorFecha = [
            { fecha: '2024-09-10', hora: '07:30 - 08:15', paciente: 'Paciente 1', observaciones: 'Consulta general' },
            { fecha: '2024-09-10', hora: '08:15 - 09:00', paciente: 'Paciente 2', observaciones: 'Chequeo' },
        ];
        const citasFiltradas = citasPorFecha.filter(cita => cita.fecha === fecha);
        setCitas(citasFiltradas);
    };

    const handleAgregarCita = (hora) => {
        setSelectedHora(hora);
        setVerForm(true);
    };

    const handleCloseForm = () => {
        setVerForm(false);
    };

    const renderRow = (horario) => {
        const citaActual = citas.find(cita => cita.hora === horario.hora);
        const esAtencionEspecial = horario.AtencionEspecial;
        const esReceso = horario.receso;

        let rowClass = '';
        if (esAtencionEspecial) {
            rowClass = 'atencion-especial';
        } else if (esReceso) {
            rowClass = 'receso';
        }

        if (!esAtencionEspecial) {
            return (
                <tr key={horario.hora} className={rowClass}>
                    <td>{esReceso ? `${horario.receso} RECESO` : horario.hora}</td>
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
                        {!esReceso && profesionalesFiltrados.length > 0 ? (
                            profesionalesFiltrados.map((profesional) => (
                                <span key={profesional.id}>
                                    {profesional.nombres} {profesional.paterno}
                                </span>
                            ))
                        ) : (
                            !esReceso && <span>No disponible</span>
                        )}
                    </td>
                    <td>
                        {esReceso ? null : (
                            citaActual ? (
                                <button className="btn btn-danger">CANCELAR CITA</button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => handleAgregarCita(horario.hora)}>AGREGAR CITA</button>
                            )
                        )}
                    </td>
                </tr>
            );
        }
        return null;
    };

    return (
        <div className="calendar-cita">
            <NavLogin />
            <main>
                {especialidad && <h3>CITA PARA EL NIÑO ({especialidad})</h3>}
                <div className='box-calendar'>
                    <p>Selecciona una fecha para ver o agregar citas</p>
                    <Calendar onChange={onDateChange} className="custom-calendar" />
                </div>
                <hr />
                <div className='list-cita'>
                    <h4>Citas para el día {selectedDate.toISOString().split('T')[0]} en consultorio {consultorio1}</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Hora</th>
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
                {especialidad === 'Enfermería' || especialidad === 'Medicina' || especialidad === 'Odontología' || especialidad === 'Obstetricia_CPN' ? (
                    <Citas2
                        fecha={selectedDate.toISOString().split('T')[0]}
                        especialidad={especialidad}
                        consultorio2={consultorio2}
                        citas={citas} // Pasamos las citas a Citas2
                        personal={profesionalesFiltrados} // Pasamos el personal filtrado
                    />
                ) : (<p style={{textAlign: 'center'}}>No hay Consultorio 2</p>)}
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