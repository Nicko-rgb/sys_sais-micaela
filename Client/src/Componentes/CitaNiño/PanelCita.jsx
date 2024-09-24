import './Citas.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import Citas1 from './Citas1';

import HorasCita from '../Complementos/HorasCita'; 

// Iconos
import { RiPlayReverseLargeFill } from "react-icons/ri";

const OpcionesCita = () => {
    const [cita, setCita] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);

    const agregarCita = (especialidad) => {
        setSelectedSpecialty(especialidad);
        setCita(!cita); // Alternar la visualización del calendario
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
                    <p>CITAS PENDIENTES CERCANAS</p>
                    <table>
                        <thead>
                            <tr>
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
                            <tr>
                                <td>2022-02-20</td>
                                <td>10:00 a.m.</td>
                                <td>Nombre Paciente</td>
                                <td>Nombre Médico</td>
                                <td>Confirmada</td>
                                <td>Consulta de rutina</td>
                                <td>Medicina</td>
                            </tr>
                        </tbody>
                    </table>
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