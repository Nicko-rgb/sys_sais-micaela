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
import { FaUserEdit, FaMale, FaFemale } from 'react-icons/fa';
import { IoMdFemale, IoMdMale } from "react-icons/io";



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

    const fetchCitas = async (fecha, especialidad) => {
        try {
            const response = await fetch(`http://localhost:5000/api/citas-ninhos?fecha=${fecha}&especialidad=${especialidad}`);
            if (!response.ok) {
                console.error('Error en la respuesta del servidor:', response.statusText);
                return;
            }

            const data = await response.json();
            setCitas(data);
            console.log('Citas obtenidas:', data);
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    };

    useEffect(() => {
        fetchPersonal();
    }, []);

    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        fetchCitas(formattedDate, especialidad);

        const intervalId = setInterval(() => {
            fetchCitas(formattedDate, especialidad);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [selectedDate, especialidad]);

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    const profesionalesFiltrados = personalList.filter(profesional => profesional.especial_cita === especialidad);

    const handleAgregarCita = (hora) => {
        setSelectedHora(hora);
        setVerForm(true);
    };

    const handleCloseForm = () => {
        setVerForm(false);
    };

    const renderRow = (horario, index, turno) => {
        const citaAtencion = citas.find(cita => cita.hora === horario.hora && cita.consultorio === 1);

        // Manejo de la fila de receso
        if (horario.receso) {
            return (
                <tr key={horario.hora} className='receso'>
                    <td>{horario.receso}</td>
                    <td colSpan={10} style={{ textAlign: 'center' }}>REFRIGERIO</td>
                </tr>
            );
        }

        // Manejo de la fila de atención especial
        if (horario.AtencionEspecial) {
            return horario.AtencionEspecial.map((atencion, atencionIndex) => {
                const citaAtencion = citas.find(cita => cita.hora === atencion.hora && cita.consultorio === 1);
                return (
                    <tr key={`${horario.hora}-${atencionIndex}`} className='atencion-especial'>
                        <td>{atencion.hora}</td>
                        <td>{turno}</td>
                        <td>{citaAtencion ? citaAtencion.dni : ''}</td>
                        <td> {/* Agregar ícono de género antes del nombre si hay una cita actual */}
                            {citaAtencion ? (
                                <>
                                    {citaAtencion.sexo === 'Femenino' ? (
                                        <FaFemale style={{ color: 'pink', marginRight: '8px', fontSize: '0.9rem' }} />
                                    ) : (
                                        <FaMale style={{ color: 'blue', marginRight: '8px', fontSize: '0.9rem' }} />
                                    )}
                                    {citaAtencion.apellidos} {citaAtencion.nombres}
                                </>
                            ) : ''}</td>
                        <td>{citaAtencion ? citaAtencion.edad : ''}</td>
                        <td>
                            {citaAtencion ?
                                new Date(citaAtencion.fechaNacimiento).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })
                                : ''
                            }
                        </td>
                        <td>{citaAtencion ? citaAtencion.telefono : ''}</td>
                        {especialidad === 'Medicina' && <td>{citaAtencion ? citaAtencion.direccion : ''}</td>}
                        {especialidad === 'Obstetricia_CPN' && <td>{citaAtencion ? citaAtencion.semEmbarazo : ''}</td>}
                        {especialidad === 'Planificación' && <td>{citaAtencion ? citaAtencion.metodo : ''}</td>}
                        <td>{citaAtencion ? citaAtencion.motivoConsulta : ''}</td>
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
                            {citaAtencion ? (
                                <button className="btn btn-danger"><FaUserEdit className='ico' />Editar Cita</button>
                            ) : (
                                <>
                                    <button className="btn btn-primary" onClick={() => handleAgregarCita(atencion.hora)}>
                                        <TiUserAdd className='ico' />
                                        AGREGAR CITA
                                    </button>
                                    <button>BLOQUEAR</button>
                                </>

                            )}
                        </td>
                    </tr>
                );
            });
        }

        // Manejo de la fila normal
        return (
            <tr key={horario.hora}>
                <td>{horario.hora}</td>
                <td>{turno}</td>
                <td>{citaAtencion ? citaAtencion.dni : ''}</td>
                <td> {/* Agregar ícono de género antes del nombre si hay una cita actual */}
                    {citaAtencion ? (
                        <>
                            {citaAtencion.sexo === 'Femenino' ? (
                                <IoMdFemale style={{ color: 'hotpink', marginRight: '5px', fontSize: '15px' }} />
                            ) : (
                                <IoMdMale style={{ color: 'blue', marginRight: '5px', fontSize: '15px' }} />)}
                            {citaAtencion.apellidos} {citaAtencion.nombres}
                        </>
                    ) : ''}</td>
                <td>{citaAtencion ? citaAtencion.edad : ''}</td>
                <td>
                    {citaAtencion ?
                        new Date(citaAtencion.fechaNacimiento).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })
                        : ''
                    }
                </td>
                <td>{citaAtencion ? citaAtencion.telefono : ''}</td>
                {especialidad === 'Medicina' && <td>{citaAtencion ? citaAtencion.direccion : ''}</td>}
                {especialidad === 'Obstetricia_CPN' && <td>{citaAtencion ? citaAtencion.semEmbarazo : ''}</td>}
                {especialidad === 'Planificación' && <td>{citaAtencion ? citaAtencion.metodo : ''}</td>}
                <td>{citaAtencion ? citaAtencion.motivoConsulta : ''}</td>
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
                    {citaAtencion ? (
                        <button className="btn btn-danger"><FaUserEdit className='ico' />EDITAR CITA</button>
                    ) : (
                        <>
                            <button className="btn btn-primary" onClick={() => handleAgregarCita(horario.hora)}>
                                <TiUserAdd className='ico' />
                                AGREGAR CITA
                            </button>
                            <button>BLOQUEAR</button>
                        </>

                    )}
                </td>
            </tr>
        );
    };

    return (
        <div className="calendar-cita">
            <NavLogin />
            <main>
                {/* // */}
                {especialidad && <h3>CITA PARA EL NIÑO ({especialidad})</h3>}
                <div className='box-calendar'>
                    <p>Selecciona una fecha para ver o agregar citas</p>
                    <Calendar
                        onChange={onDateChange}
                        className="custom-calendar" 
                        tileClassName={({ date, view }) => {
                            if (view === 'month' && date.getDay() === 0) {
                                return 'react-calendar__tile--sunday';
                            }
                            return null;
                        }}
                    />
                </div>
                {/* <hr /> */}
                <div className='list-cita'>
                    <h4>Citas para el día {selectedDate.toISOString().split('T')[0]} en consultorio {consultorio1} - {especialidad}</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Turno</th>
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

                {['Enfermería', 'Medicina', 'Odontología', 'Obstetricia_CPN', 'Biología'].includes(especialidad) ? (
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