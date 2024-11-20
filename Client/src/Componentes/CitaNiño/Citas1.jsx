import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    const consultorio1 = 1;
    const consultorio2 = 2;
    const [fecha, setFecha] = useState(new Date());
    const [citas, setCitas] = useState([]);


    useEffect(() => {
        if (especialidad) {
            axios.get(`http://localhost:5000/api/horarios-cita-nino?especialidad=${especialidad}`)
                .then(response => setHorarios(response.data))
                .catch(error => console.error("Error al obtener los horarios:", error));
        }
    }, [especialidad]);

    // Obtener las citas registradas
    useEffect(() => {
        if (especialidad) {
            axios.get('http://localhost:5000/api/filtrar-todas-citas-ninho')
                .then(response => {
                    console.log('Datos de citas:', response.data);
                    setCitas(response.data);
                })
                .catch(error => {
                    console.error("Error al obtener las citas:", error);
                    setCitas([]); // Asegúrate de manejar el error asignando un array vacío
                });
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

    const fechaFormatNumero = new Date(fecha).toISOString().split('T')[0];

    return (
        <div className="cita-nino">
            <NavLogin />
            <h5 className="title-page">Horarios de cita para <span style={{ textDecoration: 'underline' }}>{especialidad}</span> </h5>
            <Calendar
                className="custom-calendar"
                onChange={handleDateChange}
                value={fecha}
                tileClassName={({ date, view }) => view === 'month' && date.getDay() === 0 ? 'react-calendar__tile--sunday' : null}
            />
            <main>
                <div className="container-tb">
                    <div className="header-tab">
                        <p className="sub-title-page">CONSULTORIO N° {consultorio1}  </p>
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
                            citas = {citas}
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
