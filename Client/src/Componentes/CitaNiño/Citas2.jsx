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

    const renderRow = (horario, index, horarios) => {
        const citaActual = citas.find(cita => cita.hora === horario.hora);
        const profesional = personal.find(profesional => profesional.especial_cita === especialidad);
        const esReceso = horario.receso;
        const esAtencionEspecial = horario.AtencionEspecial;

        let rowClass = '';
        let turno = 'Mañana'; // Por defecto, antes del receso es "Mañana"

        // Verificamos si hay un receso y cambiamos el turno según la posición
        const recesoIndex = horarios.findIndex(h => h.receso);
        if (recesoIndex !== -1 && index > recesoIndex) {
            turno = 'Tarde'; // Si estamos después del receso, el turno será "Tarde"
        }

        // Renderizar fila para "Receso"
        if (esReceso) {
            return (
                <tr key={horario.hora} className="receso">
                    <td>{horario.receso}</td>
                    <td colSpan="10">RECESO</td>
                </tr>
            );
        }

        // Renderizar fila para "Atención Especial"
        if (esAtencionEspecial) {
            return horario.AtencionEspecial.map((especial, index) => (
                <tr key={`especial-${index}`} className="atencion-especial">
                    <td>{especial.hora}</td>
                    <td>{turno}</td> {/* Mostrar el turno aquí */}
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    {especialidad === 'Medicina' && <td> </td>}
                    {especialidad === 'Obstetricia_CPN' && <td> </td>}
                    {especialidad === 'Planificación' && <td> </td>}
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
                            <button className="btn btn-primary" onClick={() => handleAgregarCita(especial.hora)}><TiUserAdd />AGREGAR CITA</button>
                        )}
                    </td>
                </tr>
            ));
        }

        // Renderizar fila para citas normales
        return (
            <tr key={horario.hora}>
                <td>{horario.hora}</td>
                <td>{turno}</td> {/* Mostrar el turno aquí */}
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                {especialidad === 'Medicina' && <td> </td>}
                {especialidad === 'Obstetricia_CPN' && <td> </td>}
                {especialidad === 'Planificación' && <td> </td>}
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
                        <button className="btn btn-primary" onClick={() => handleAgregarCita(horario.hora)}><TiUserAdd />AGREGAR CITA</button>
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
                            <th>Hist. Clínico</th>
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
                        {HorasCita[especialidad]?.map((horario, index, horarios) => renderRow(horario, index, horarios))}
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
