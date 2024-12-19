import axios from 'axios';
import { useState } from 'react';

const EditCita = ({ closeForm, citaData, horarios, formatTime, especialidad }) => {
    // Estado para manejar la fecha y hora seleccionadas
    const [fechaReprogramada, setFechaReprogramada] = useState(citaData.fecha);
    const [horaReprogramada, setHoraReprogramada] = useState(citaData.hora);
    const [consultorio, setConsultorio] = useState(citaData.consultorio)

    // Función para formatear la fecha
    const fFecha = (fecha) => new Date(fecha).toISOString().split('T')[0];

    const handleEditCita = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            const response = await axios.put(
                `http://localhost:5000/api/edit-citas-ninio/${citaData.id}`,
                {
                    fecha: fechaReprogramada,
                    hora: horaReprogramada,
                    consultorio,
                    especialidad
                }
            );

            alert(response.data.message || 'Cita actualizada correctamente');
            closeForm(); // Cerrar el formulario después de guardar
        } catch (error) {
            // Manejar errores del servidor y mostrar el mensaje al usuario
            alert('Error al actualizar cita. Posiblemente el horario ya está ocupado.');
            console.error('Error al editar la cita:', error);
        }
    };


    return (
        <div className="form-cita">
            <form onSubmit={handleEditCita}>
                <p className="ico-close" onClick={closeForm}>
                    ×
                </p>
                <h2>Reprogramar Cita - {especialidad} </h2>
                <br />
                <div>
                    <label>
                        Apellidos
                        <input className='no-edit' type="text" value={`${citaData.ape_paterno} ${citaData.ape_materno} `} disabled />
                    </label>
                    <label>
                        Nombres
                        <input className='no-edit' type="text" value={citaData.nombres} disabled />
                    </label>
                </div>
                <div>
                    <label>
                        DNI
                        <input className='no-edit' type="text" value={citaData.dni} disabled />
                    </label>
                    <label>
                        Fecha de Nacimiento
                        <input className='no-edit' type="date" value={fFecha(citaData.fecha_nacimiento)} disabled />
                    </label>
                </div>
                <div className="box-filtra">
                    <label>
                        Reprogramar Fecha:
                        <input
                            type="date"
                            value={fFecha(fechaReprogramada)}
                            onChange={(e) => setFechaReprogramada(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Reprogramar Hora:
                        <select
                            value={horaReprogramada}
                            onChange={(e) => setHoraReprogramada(e.target.value)}
                            required
                        >
                            <option value={citaData.hora}>{citaData.hora}</option>
                            {horarios
                                .filter((hora) => hora.tipo_atencion !== 'receso') //filtrar horarios con tipo_atencion diferente de "receso"
                                .map((hora, index) => (
                                    <option
                                        key={index}
                                        value={`${formatTime(hora.hora_inicio)} - ${formatTime(hora.hora_fin)}`}
                                    >
                                        {formatTime(hora.hora_inicio)} - {formatTime(hora.hora_fin)}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <p>Reprogramar Cita:</p>
                    <label>Consultorio:
                        {['Enfermería', 'Odontología', 'Medicina'].includes(especialidad) ? (
                            <select
                                value={consultorio}
                                onChange={(e) => setConsultorio(e.target.value)}
                                required
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        ) : (
                            <input type="text" value={consultorio} disabled />
                        )}
                    </label>
                </div>
                <div className="btnss">
                    <button className="btn-cancel" type="button" onClick={closeForm}>
                        Cancelar
                    </button>
                    <button className="btn-save" type="submit">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCita;
