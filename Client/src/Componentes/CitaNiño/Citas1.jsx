import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './citas.css';
import '../Complementos/general.css';
import NavPie from '../Navegadores/NavPie';
import NavLogin from '../Navegadores/NavLogin';
import Citas2 from './Citas2'
import CuerpoTabla from './CuerpoTabla';
import Calendar from 'react-calendar';

const HorarioCitaTable = () => {
    const location = useLocation();
    const { especialidad } = location.state || {};
    const [horarios, setHorarios] = useState([]);
    const [consultorio1] = useState(1)
    const [consultorio2] = useState(2)

    useEffect(() => {
        if (especialidad) {
            axios.get(`http://localhost:5000/api/horarios-cita-nino?especialidad=${especialidad}`)
                .then(response => {
                    setHorarios(response.data);
                })
                .catch(error => {
                    console.error("Error al obtener los horarios:", error);
                });
        }
    }, [especialidad]);

    const formatTime = (timeString) => {
        if (!timeString) return '---';

        const parts = timeString.split(':');
        if (parts.length < 2) return '---';

        // Asumimos que parts[0] es la hora y parts[1] son los minutos
        const hours = parts[0].padStart(2, '0');
        const minutes = parts[1].padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    if (!especialidad) {
        return <p>Especialidad no encontrada o no se recibieron datos.</p>;
    }

    let colSpan = 0
    if (especialidad === 'Medicina' || especialidad === 'Obstetricia_CPN' || especialidad === 'Planificación') {
        colSpan = 8
    } else {
        colSpan = 9
    }

    return (
        <div className="cita-nino">
            <NavLogin />
            <h5 className='title-page'>Horarios de cita para <span style={{ textDecoration: 'underline' }}>{especialidad}</span> </h5>
            <Calendar
                className="custom-calendar"
                tileClassName={({ date, view }) => {
                    if (view === 'month' && date.getDay() === 0) {
                        return 'react-calendar__tile--sunday';
                    }
                    return null;
                }}
            />
            <div className="container-tb1">
                <p>CONSULTORIO N° {consultorio1} </p>
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
                        formatTime={formatTime}
                        colSpan={colSpan}
                    />
                </table>
            </div>
            {
                ['Enfermería', 'Odontología', 'Obstetricia_CPN',].includes(especialidad) ? (
                    <Citas2
                        especialidad={especialidad}
                        horarios={horarios}
                        consultorio={consultorio2}
                    />
                ) : (<p style={{ textAlign: 'center' }}>No hay Consultorio 2</p>)
            }
            <NavPie />
        </div>
    );
};

export default HorarioCitaTable;