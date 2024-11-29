import axios from 'axios';
import { useState } from 'react';

const EditCita = ({ closeForm, citaData, horarios, formatTime }) => {
    // Estado para manejar la fecha y hora seleccionadas
    const [fechaReprogramada, setFechaReprogramada] = useState(citaData.fecha);
    const [horaReprogramada, setHoraReprogramada] = useState(citaData.hora);

    // Función para formatear la fecha
    const fFecha = (fecha) => new Date(fecha).toISOString().split('T')[0];

    const handleEditCita = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            await axios.put(`http://localhost:5000/api/edit-citas-ninio/${citaData.id}`, {
                fecha: fechaReprogramada,
                hora: horaReprogramada,
            });
            closeForm(); // Cerrar el formulario después de guardar
        } catch (error) {
            console.error('Error al editar la cita:', error);
        }
    };

    return (
        <div className="form-cita">
            <form onSubmit={handleEditCita}>
                <p className="ico-close" onClick={closeForm}>
                    ×
                </p>
                <h2>Reprogramar Cita</h2>
                <p>{citaData.nombres}</p>
                <div>
                    <label>
                        Apellidos
                        <input className='no-edit' type="text" value={citaData.apellidos} disabled />
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
                        <input className='no-edit' type="date" value={fFecha(citaData.fechaNacimiento)} disabled />
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
                            {horarios.map((hora, index) => (
                                <option
                                    key={index}
                                    value={`${formatTime(hora.hora_inicio)} - ${formatTime(hora.hora_fin)}`}
                                >
                                    {formatTime(hora.hora_inicio)} - {formatTime(hora.hora_fin)}
                                </option>
                            ))}
                        </select>
                    </label>
                    <p>Reprogramar Cia:</p>
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
