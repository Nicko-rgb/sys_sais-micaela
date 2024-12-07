import React from 'react'

const CuerpoTabla = ({ activosFiltrados, fechasDelMes, tiposDeTurno, obtenerClaveTurno, turnos, manejarClickPersonal, columnasBloqueadas, manejarGuardarTurno }) => {
    return (
        <tbody>
            {activosFiltrados.map((personal, index) => (
                <tr key={personal.id_personal}>
                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                    <td className="names" onClick={(event) => manejarClickPersonal(personal, event)}>
                        {`${personal.paterno} ${personal.materno}, ${personal.nombres}`}
                    </td>
                    {fechasDelMes.map((fecha, fechaIndex) => {
                        const esDomingo = fecha.getDay() === 0; // Verifica si es domingo
                        const columnaBloqueada = columnasBloqueadas.includes(fecha.toDateString()); // Verifica si está bloqueada

                        return (
                            <td
                                key={fechaIndex}
                                className={`${columnaBloqueada ? 'bloqueada' : ''} ${esDomingo ? 'domingo' : ''}`.trim()}
                            >
                                {!esDomingo && !columnaBloqueada && (
                                    <select
                                        className={
                                            obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'M' ? 'mm' :
                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'T' ? 'tt' :
                                                    obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'GD' ? 'gd' :
                                                        obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'GDD' ? 'gdd' :
                                                            obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'MT' ? 'mt' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'MVD' ? 'mvd' :
                                                                    obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'TVD' ? 'tvd' :
                                                                        obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'MVSF' ? 'mvsf' :
                                                                            obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'TVSL' ? 'tvsl' :
                                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'L' ? 'll' : ''
                                        }
                                        value={turnos[`${personal.id_personal}_${fecha.toDateString()}`] || ""}
                                        onChange={(e) => manejarGuardarTurno(personal.id_personal, fecha, e.target.value)}
                                    >
                                        <option value=""></option>
                                        {tiposDeTurno.map(turno => (
                                            <option key={turno.id_turno_tipo} value={turno.id_turno_tipo}>
                                                {turno.clave_turno}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    )
}

export default CuerpoTabla