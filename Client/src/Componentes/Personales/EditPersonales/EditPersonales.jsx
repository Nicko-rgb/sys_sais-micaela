import React, { useState } from "react";
import "./EditPersonales.css";

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const shiftTypes = ["Mañana (M)", "Tarde (T)", "Guardia Diurna (GD)", "Mañana y Tarde (MT)"];

const EditPersonales = ({ personData, onSave, onClose }) => {
    const [formData, setFormData] = useState({ ...personData });
    const [assignShift, setAssignShift] = useState(false);
    const [shiftsByWeek, setShiftsByWeek] = useState({}); // Estado para almacenar los turnos por semana
    const [currentWeek, setCurrentWeek] = useState(new Date()); // Estado para manejar la semana actual
    const today = new Date();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, shiftsByWeek });
    };

    const handleShiftChange = (day, shiftType) => {
        const weekKey = getWeekKey(currentWeek);
        const updatedShifts = { ...shiftsByWeek[weekKey], [day]: shiftType };
        setShiftsByWeek({ ...shiftsByWeek, [weekKey]: updatedShifts });
    };

    const getWeekDates = (startDate) => {
        const week = [];
        const startOfWeek = new Date(startDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            week.push(day);
        }
        return week;
    };

    const getWeekKey = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
        return startOfWeek.toDateString();
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentWeek);
        nextWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(nextWeek);
    };

    const handlePreviousWeek = () => {
        const previousWeek = new Date(currentWeek);
        previousWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(previousWeek);
    };

    const weekDates = getWeekDates(currentWeek);
    const currentWeekKey = getWeekKey(currentWeek);
    const shifts = shiftsByWeek[currentWeekKey] || {};

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form className="form-personal">
                    <h3>Editar Datos Personales</h3>
                    <label>DNI:
                        <input type="text" value={formData.dni} onChange={handleChange} />
                    </label>
                    <div>
                        <label>Apellido Paterno:
                            <input type="text" value={formData.paterno} onChange={handleChange} />
                        </label>
                        <label>Apellido Materno:
                            <input type="text" value={formData.materno} onChange={handleChange} />
                        </label>
                    </div>
                    <label>Nombre:
                        <input type="text" value={formData.nombres} onChange={handleChange} />
                    </label>
                    <div>
                        <label>Tipo:
                            <select value={formData.tipo_user} onchange={handleChange}>
                                <option value="Jefe">Jefe</option>
                                <option value="Admin">Admin</option>
                                <option value="Responsable">Responsable</option>
                            </select>
                        </label>
                        <label>Condición:
                            <select value={formData.condicion} onChange={handleChange} >
                                <option value="Nombrado">Nombrado</option>
                                <option value="Contratado">Contratado</option>
                                <option value="Tercero">Tercero</option>
                                <option value="CAS">CAS</option>
                                <option value="CLAS">CLAS</option>
                                <option value="Serums">Serums</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Profesión:
                            <input type="text" value={formData.profesion} onChange={handleChange} />
                        </label>
                        <label>Servicio:
                            <input type="text" value={formData.servicio} onChange={handleChange} />
                        </label>
                    </div>
                    <label>Celular:
                        <input type="text" value={formData.celular} onChange={handleChange} />
                    </label>
                    <div className="selec-cita">
                        {formData.especial_cita ? (
                            <label>Especialidad en citas:
                                <select value={formData.especial_cita} onchange={handleChange}>
                                    <option value="">Anular</option>
                                    <option value="Enfermería">Enfermería</option>
                                    <option value="Medicina">Medicina</option>
                                    <option value="Psicología">Psicología</option>
                                    <option value="Nutrición">Nutrición</option>
                                    <option value="Odontología">Odontología</option>
                                    <option value="Planificación">Planificación</option>
                                    <option value="Obstetricia_CPN">Obstetricia_CPN</option>
                                </select>
                            </label>
                        ) : (
                            <label>Seleccione especialidad para citas:
                                <select value={formData.especial_cita} onchange={handleChange} >
                                    <option value="">Seleccione una opción</option>
                                    <option value="Enfermería">Enfermería</option>
                                    <option value="Medicina">Medicina</option>
                                    <option value="Psicología">Psicología</option>
                                    <option value="Nutrición">Nutrición</option>
                                    <option value="Odontología">Odontología</option>
                                    <option value="Planificación">Planificación</option>
                                    <option value="Obstetricia_CPN">Obstetricia_CPN</option>
                                </select>
                            </label>
                        )}
                    </div>

                    <label className="check-btn">Asignar Turno:
                        <input type="checkbox" checked={assignShift} onChange={() => setAssignShift(!assignShift)} />
                    </label>

                    <div className="modal-actions">
                        <button type="submit" className="btn-save">Guardar</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                    </div>
                </form>

                {
                    assignShift && (
                        <form className="shift-table">
                            <h3>Asignar Turnos por Semana</h3>
                            <div className="week-navigation">
                                <button type="button" onClick={handlePreviousWeek}>
                                    Anterior Semana
                                </button>
                                <button type="button" onClick={handleNextWeek}>
                                    Siguiente Semana
                                </button>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Turno</th>
                                        {weekDates.map((date, index) => (
                                            <th key={index}>
                                                {daysOfWeek[index]} <br /> ({date.toLocaleDateString()})
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {shiftTypes.map((shiftType, shiftIndex) => (
                                        <tr key={shiftIndex}>
                                            <td>{shiftType}</td>
                                            {weekDates.map((date, index) => {
                                                const dayKey = date.toDateString();
                                                const isPastDate = date < today;
                                                return (
                                                    <td key={index}>
                                                        <input
                                                            type="checkbox"
                                                            checked={shifts[dayKey] === shiftType}
                                                            onChange={() => handleShiftChange(dayKey, shiftType)}
                                                            disabled={isPastDate}
                                                        />
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button type="submit" className="btn-save">Guardar</button>
                        </form>
                    )
                }
            </div >
        </div >
    );
};

export default EditPersonales;