import './Citas.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavLogin from '../Navegadores/NavLogin'
import NavPie from '../Navegadores/NavPie'
import Citas1 from './Citas1'

import { TbNurse } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdPsychology } from "react-icons/md";
import { FaTooth, FaCalendarAlt, FaBaby } from 'react-icons/fa';
import { LiaNutritionix } from "react-icons/lia";
import { RiPlayReverseLargeFill } from "react-icons/ri";

const OpcionesCita = () => {
    const [cita, setCita] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null); // Estado para la especialidad seleccionada

    //aqui declaramos las especialidades para el niño
    const especialidades = {
        enfermeria: 'Enfermería',
        medicina: 'Medicina',
        psicologia: 'Psicología',
        nutricion: 'Nutrición',
        odontologia: 'Odontología',
        planificacion: 'Planificación',
        obstetricia: 'Obstetricia_CPN'
    };

    const agregarCita = (especialidad) => {
        setSelectedSpecialty(especialidad); // Actualiza la especialidad seleccionada
        setCita(!cita); // Muestra el calendario
    };

    return (
        <div className="opciones-cita">
            <NavLogin />
            <main>
                <h5>ESPECIALIDADES DISPONIBLES PARA CITAS</h5>
                <section>
                    <div>
                        <Link to='/panel-niño' className='volver_link'>
                            <RiPlayReverseLargeFill /> Volver
                        </Link>
                        <button className="box" onClick={() => agregarCita(especialidades.enfermeria)}><TbNurse className='icon' />{especialidades.enfermeria}</button>
                        <button className="box" onClick={() => agregarCita(especialidades.medicina)}><FaUserDoctor className='icon' />{especialidades.medicina}</button>
                        <button className="box" onClick={() => agregarCita(especialidades.psicologia)}><MdPsychology className='icon' />{especialidades.psicologia}</button>
                        <button className="box" onClick={() => agregarCita(especialidades.nutricion)}><LiaNutritionix className='icon' />{especialidades.nutricion}</button>
                    </div>
                    <div>
                        <button className="box" onClick={() => agregarCita(especialidades.odontologia)}><FaTooth className='icon' />{especialidades.odontologia}</button>
                        <button className="box" onClick={() => agregarCita(especialidades.planificacion)}><FaCalendarAlt className='icon' />{especialidades.planificacion}</button>
                        <button className="box" onClick={() => agregarCita(especialidades.obstetricia)}><FaBaby className='icon' />{especialidades.obstetricia}</button>
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
                                <th>Nombre Medico</th>
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
                                <td>Nombre Medico</td>
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
    )
}

export default OpcionesCita;