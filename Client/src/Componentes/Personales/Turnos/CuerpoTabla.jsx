import React from 'react';
import Store from '../../Store/Store_Cita_Turno';
import EstadoSesion from '../../Complementos/EstadoSesion';

const CuerpoTabla = ({ activosFiltrados, fechasDelMes, tiposDeTurno, obtenerClaveTurno, turnos, manejarClickPersonal, columnasBloqueadas, manejarGuardarTurno }) => {
    const { coloresTurno } = Store();
    const { tipoUser } = EstadoSesion()
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
                                className={`claves ${columnaBloqueada ? 'bloqueada' : ''} ${esDomingo ? 'domingo' : ''}`.trim()}
                            >
                                {!esDomingo && !columnaBloqueada && (
                                    tipoUser.toLowerCase() !== 'responsable' ? (
                                        <select
                                            value={turnos[`${personal.id_personal}_${fecha.toDateString()}`] || ""}
                                            onChange={(e) => manejarGuardarTurno(personal.id_personal, fecha, e.target.value)}
                                            style={{
                                                backgroundColor: coloresTurno[obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`])] || '',
                                            }}
                                        >
                                            <option value=""></option>
                                            {tiposDeTurno.map(turno => (
                                                <option key={turno.id_turno_tipo} value={turno.id_turno_tipo}>
                                                    {turno.clave_turno}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p
                                            style={{
                                                backgroundColor: coloresTurno[obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`])] || '',
                                            }}
                                        >
                                            {
                                                tiposDeTurno.find(turno => turno.id_turno_tipo === turnos[`${personal.id_personal}_${fecha.toDateString()}`])
                                                    ?.clave_turno || ""
                                            }
                                        </p>
                                    )

                                )}
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    );
}

export default CuerpoTabla;
