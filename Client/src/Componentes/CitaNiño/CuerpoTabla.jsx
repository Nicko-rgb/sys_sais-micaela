import React from 'react'
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const CuerpoTabla = ({horarios, especialidad, formatTime, colSpan} ) => {
    return (
        <tbody>
            {horarios.map((horario, index) => {
                if (horario.tipo_atencion === 'receso') {
                    return (
                        <tr key={index} className="receso">
                            <td style={{ textAlign: 'center' }} colSpan="2">{formatTime(horario.hora_inicio)} - {formatTime(horario.hora_fin)}</td>
                            <td style={{ textAlign: 'center' }} colSpan={colSpan} >Receso</td>
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
                        <td>{
                            <>
                                <CiEdit className='ico' />
                                <FaRegCalendarPlus className='ico' />
                                <MdOutlineRemoveCircleOutline className='ico' />
                            </>
                        }</td>
                    </tr>
                );
            })}
        </tbody>
    )
}

export default CuerpoTabla