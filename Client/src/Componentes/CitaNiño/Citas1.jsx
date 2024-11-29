import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCalendarCheck } from "react-icons/fa";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import axios from 'axios';
import './Citas.css';
import '../Complementos/general.css';
import NavPie from '../Navegadores/NavPie';
import NavLogin from '../Navegadores/NavLogin';
import Citas2 from './Citas2';
import CuerpoTabla from './CuerpoTabla';
import Calendar from 'react-calendar';

const Cita1 = () => {
    const location = useLocation();
    const { especialidad } = location.state || {};
    const [horarios, setHorarios] = useState([]);
    const [openCalendar, setOpenCalendar] = useState(false)
    const consultorio1 = 1;
    const consultorio2 = 2;
    const [fecha, setFecha] = useState(new Date());


    useEffect(() => {
        if (especialidad) {
            axios.get(`http://localhost:5000/api/horarios-cita-nino?especialidad=${especialidad}`)
                .then(response => setHorarios(response.data))
                .catch(error => console.error("Error al obtener los horarios:", error));
        }
    }, [especialidad]);

    const handleDateChange = (date) => {
        setFecha(date);
    };

    if (!especialidad) {
        return <p>Especialidad no encontrada o no se recibieron datos.</p>;
    }

    // Convertir fecha a formato legible
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleCalendar = () => {
        setOpenCalendar(!openCalendar);
    }

    const fechaFormatNumero = new Date(fecha).toISOString().split('T')[0];

    return (
        <div className="cita-nino">
            <NavLogin />
            <h4 className="title-page">Horarios de cita para <span style={{ textDecoration: 'underline' }}>{especialidad}</span> </h4>
            <main>
                <div className="container-tb">
                    <div className="header-tab">
                        <Link to='/panel-cita' className='volver_link'>
                            <RiPlayReverseLargeFill /> Volver
                        </Link>
                        {openCalendar && (
                            <Calendar
                                className="custom-calendar"
                                onChange={handleDateChange}
                                value={fecha}
                                tileClassName={({ date, view }) => view === 'month' && date.getDay() === 0 ? 'react-calendar__tile--sunday' : null}
                            />
                        )}
                        <p className="sub-title-page">CONSULTORIO N° {consultorio1}  </p>
                        <button className='bt' onClick={handleCalendar}><FaCalendarCheck />{openCalendar ? 'Cerrar Calendario' : 'Abrir Calendario'} </button>
                        <p className='sub-title-page'>{fechaFormateada} </p>
                    </div>
                    <table className="cita-table">
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Turno</th>
                                <th>DNI</th>
                                <th>Apellidos y Nombres</th>
                                <th>Edad</th>
                                <th>Fecha Nacimiento</th>
                                <th>Celular</th>
                                {especialidad === 'Medicina' && <th>Dirección</th>}
                                {especialidad === 'Obstetricia_CPN' && <th>Sem. de Embarazo</th>}
                                {especialidad === 'Planificación' && <th>Método Planificación</th>}
                                <th>Motivo Consulta</th>
                                <th>Responsable</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <CuerpoTabla
                            horarios={horarios}
                            especialidad={especialidad}
                            fecha={fechaFormatNumero}
                            consultorio={consultorio1}
                        />
                    </table>
                </div>
                <hr />
                {['Enfermería', 'Odontología', 'Medicina'].includes(especialidad) ? (
                    <Citas2
                        horarios={horarios}
                        especialidad={especialidad}
                        consultorio={consultorio2}
                        fecha={fechaFormatNumero}
                        fechaT={fechaFormateada}
                    />
                ) : (
                    <p style={{ textAlign: 'center' }}>No hay Consultorio 2</p>
                )}
            </main>

            <NavPie />
        </div>
    );
};

export default Cita1;
