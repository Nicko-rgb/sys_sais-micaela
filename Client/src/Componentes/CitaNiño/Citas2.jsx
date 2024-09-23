import React, { useState } from 'react';
import HorasCita from '../Complementos/HorasCita';
import FormCitas from './FormCitas';
import { TiUserAdd } from "react-icons/ti";

const Citas2 = ({ fecha, especialidad, consultorio2, citas, personal }) => {
    const [verForm, setVerForm] = useState(false);
    const [horaSeleccionada, setHoraSeleccionada] = useState('');

    const handleAgregarCita = (hora) => {
        setHoraSeleccionada(hora);
        setVerForm(true);
    };

    const handleCloseForm = () => {
        setVerForm(false);
        setHoraSeleccionada('');
    };

    const renderRow = (horario, index, turno) => {
        // Filtrar citas para el consultorio 2
        const citaActual = citas.find(cita => cita.hora === horario.hora && cita.consultorio === consultorio2);
        const profesional = personal.find(profesional => profesional.especial_cita === especialidad);
        const esReceso = horario.receso;
        const esAtencionEspecial = horario.AtencionEspecial;
    
        // Renderizar fila para "Receso"
        if (esReceso) {
            return (
                <tr key={horario.hora} className="receso">
                    <td>{horario.receso}</td>
                    <td colSpan={10} style={{ textAlign: 'center' }}>Receso</td>
                </tr>
            );
        }
    
        // Renderizar fila para "Atención Especial"
        if (esAtencionEspecial) {
            return esAtencionEspecial.map((especial, index) => {
                const citaEspecial = citas.find(cita => cita.hora === especial.hora && cita.consultorio === consultorio2);
                return (
                    <tr key={`especial-${index}`} className="atencion-especial">
                        <td>{especial.hora}</td>
                        <td>{turno}</td>
                        <td>{citaEspecial ? citaEspecial.dni : ''}</td>
                        <td>{citaEspecial ? `${citaEspecial.apellidos} ${citaEspecial.nombres}` : ''}</td>
                        <td>{citaEspecial ? citaEspecial.edad : ''}</td>
                        <td>{citaEspecial ? citaEspecial.fechaNacimiento : ''}</td>
                        <td>{citaEspecial ? citaEspecial.telefono : ''}</td>
                        {especialidad === 'Medicina' && <td>{citaEspecial ? citaEspecial.direccion : ''}</td>}
                        {especialidad === 'Obstetricia_CPN' && <td>{citaEspecial ? citaEspecial.semEmbarazo : ''}</td>}
                        {especialidad === 'Planificación' && <td>{citaEspecial ? citaEspecial.metodo : ''}</td>}
                        <td> </td>
                        <td>
                            {profesional ? (
                                <span>{profesional.nombres} {profesional.paterno}</span>
                            ) : (
                                <span>No disponible</span>
                            )}
                        </td>
                        <td>
                            {citaEspecial ? (
                                <button className="btn btn-danger">CANCELAR CITA</button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => handleAgregarCita(especial.hora)}>
                                    <TiUserAdd /> AGREGAR CITA
                                </button>
                            )}
                        </td>
                    </tr>
                );
            });
        }
    
        // Renderizar fila para citas normales
        return (
            <tr key={horario.hora}>
                <td>{horario.hora}</td>
                <td>{turno}</td>
                <td>{citaActual ? citaActual.dni : ''}</td>
                <td>{citaActual ? `${citaActual.apellidos} ${citaActual.nombres}` : ''}</td>
                <td>{citaActual ? citaActual.edad : ''}</td>
                <td>{citaActual ? citaActual.fechaNacimiento : ''}</td>
                <td>{citaActual ? citaActual.telefono : ''}</td>
                {especialidad === 'Medicina' && <td>{citaActual ? citaActual.direccion : ''}</td>}
                {especialidad === 'Obstetricia_CPN' && <td>{citaActual ? citaActual.semEmbarazo : ''}</td>}
                {especialidad === 'Planificación' && <td>{citaActual ? citaActual.metodo : ''}</td>}
                <td> </td>
                <td>
                    {profesional ? (
                        <span>{profesional.nombres} {profesional.paterno}</span>
                    ) : (
                        <span>No disponible</span>
                    )}
                </td>
                <td>
                    {citaActual ? (
                        <button className="btn btn-danger">CANCELAR CITA</button>
                    ) : (
                        <button className="btn btn-primary" onClick={() => handleAgregarCita(horario.hora)}>
                            <TiUserAdd /> AGREGAR CITA
                        </button>
                    )}
                </td>
            </tr>
        );
    };
    
    return (
        <div className="citas2">
            <h4>Citas para el día {fecha} en consultorio {consultorio2} - {especialidad}</h4>
            <div>
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
            {verForm && (
                <FormCitas
                    especialidad={especialidad}
                    fecha={fecha}
                    hora={horaSeleccionada}
                    consultorio={consultorio2}
                    handleCloseForm={handleCloseForm}
                />
            )}
        </div>
    );
};

export default Citas2;