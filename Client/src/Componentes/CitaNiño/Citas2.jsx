import React from 'react';
import { useState } from 'react';
import HorasCita from '../Complementos/HorasCita';
import FormCitas from './FormCitas';
const Citas2 = ({ fecha, especialidad, consultorio2, citas, personal }) => {

    const [verForm, setVerForm] = useState(false);
    const [horaSeleccionada, setHoraSeleccionada] = useState('');

    const handleAgregarCita = (hora) => {
        setHoraSeleccionada(hora); // Guardamos la hora seleccionada
        setVerForm(true);          // Mostramos el formulario
    };

    const handleCloseForm = () => {
        setVerForm(false);
        setHoraSeleccionada('');   // Reseteamos la hora seleccionada
    };

    const renderRow = (horario) => {
        // Aquí asumimos que horario tiene las mismas propiedades que en Citas1, como AtencionEspecial y Receso
        const citaActual = citas.find(cita => cita.hora === horario.hora);
        const profesional = personal.find(profesional => profesional.especial_cita === especialidad);
        const esReceso = horario.receso;  // Verificamos si es un receso
        const atencionEspecial = horario.AtencionEspecial;  // Verificamos si es atención especial
    
        let rowClass = '';
        if (atencionEspecial) {
            rowClass = 'atencion-especial';  // Clase para atención especial
        } else if (esReceso) {
            rowClass = 'receso';  // Clase para receso
        }
    
        return (
            <tr key={horario.hora} className={rowClass}>
                <td>{esReceso ? `${horario.receso} RECESO` : horario.hora}</td>
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
                    {!esReceso && profesional ? (
                        <span>{profesional.nombres} {profesional.paterno}</span>
                    ) : (
                        !esReceso && <span>No disponible</span>
                    )}
                </td>
                <td>
                    {esReceso ? null : (
                        citaActual ? (
                            <button className="btn btn-danger">CANCELAR CITA</button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => handleAgregarCita(horario.hora)}>AGREGAR CITA</button>
                        )
                    )}
                </td>
            </tr>
        );
    };
    

    return (
        <div className="citas2">
            <h4>Citas para el día {fecha} en consultorio {consultorio2}</h4>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Hora</th>
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
                        {HorasCita[especialidad]?.map(renderRow)}
                    </tbody>
                </table>
            </div>
            { verForm && (
                <FormCitas 
                    especialidad={especialidad}
                    fecha={fecha}
                    hora = {horaSeleccionada}
                    consultorio={consultorio2}
                    handleCloseForm={handleCloseForm}
                />
            )}
        </div>
    );
};

export default Citas2;
