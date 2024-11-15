import React from 'react';
import './citas.css';
import { CiEdit } from "react-icons/ci";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

const Citas2 = ({ especialidad, horarios, consultorio }) => {
    const formatTime = (timeString) => {
        if (!timeString) return '---';

        const parts = timeString.split(':');
        if (parts.length < 2) return '---';

        const hours = parts[0].padStart(2, '0');
        const minutes = parts[1].padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    let colSpan = 0;
    if (especialidad === 'Medicina' || especialidad === 'Obstetricia_CPN' || especialidad === 'Planificación') {
        colSpan = 8;
    } else {
        colSpan = 9;
    }

    return (
        <div className="container-tb2">
            <p>CONSULTORIO N° {consultorio} </p>
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
                <tbody>
                    {horarios.map((horario, index) => {
                        if (horario.tipo_atencion === 'receso') {
                            return (
                                <tr key={index} className="receso">
                                    <td style={{ textAlign: 'center' }} colSpan="2">{formatTime(horario.hora_inicio)} - {formatTime(horario.hora_fin)}</td>
                                    <td style={{ textAlign: 'center' }} colSpan={colSpan}>Receso</td>
                                    {especialidad === 'Medicina' && <td></td>}
                                    {especialidad === 'Obstetricia_CPN' && <td></td>}
                                    {especialidad === 'Planificación' && <td></td>}
                                </tr>
                            );
                        }

                        const tipoAtencion = horario.tipo_atencion === 'AtencionEspecial'
                            ? 'atencion-especial'
                            : horario.tipo_atencion === 'receso'
                                ? 'receso'
                                : 'normal';

                        return (
                            <tr key={index} className={tipoAtencion}>
                                <td>{`${formatTime(horario.hora_inicio)} - ${formatTime(horario.hora_fin)}`}</td>
                                <td>{horario.turno}</td>
                                <td>{horario.dni || '---'}</td>
                                <td>{horario.apellidos_nombres || '---'}</td>
                                <td>{horario.edad || '---'}</td>
                                <td>{horario.fecha_nacimiento || '---'}</td>
                                <td>{horario.celular || '---'}</td>
                                {especialidad === 'Medicina' && <td></td>}
                                {especialidad === 'Obstetricia_CPN' && <td></td>}
                                {especialidad === 'Planificación' && <td></td>}
                                <td>{horario.motivo_consulta || '---'}</td>
                                <td>{horario.responsable || '---'}</td>
                                <td>
                                    <>
                                        <CiEdit className='ico' />
                                        <FaRegCalendarPlus className='ico' />
                                        <MdOutlineRemoveCircleOutline className='ico' />
                                    </>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Citas2;
