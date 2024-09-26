import React, { useState } from "react";
import "./EditPersonales.css";
import TurnoPersonal from '../Turnos/TurnosPersonal' // Importamos el nuevo componente

const EditPersonales = ({ personData, onSave, onClose }) => {
    const [formData, setFormData] = useState({ ...personData });
    const [assignShift, setAssignShift] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };
    
    const cerrarTblTurno = () => {
        setAssignShift(false);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form className="form-personal" onSubmit={handleSubmit}>
                    <h3>Editar Datos Personales</h3>
                    <label>DNI:
                        <input type="text" value={formData.dni} name="dni" onChange={handleChange} />
                    </label>
                    <div>
                        <label>Apellido Paterno:
                            <input type="text" value={formData.paterno} name="paterno" onChange={handleChange} />
                        </label>
                        <label>Apellido Materno:
                            <input type="text" value={formData.materno} name="materno" onChange={handleChange} />
                        </label>
                    </div>
                    <label>Nombre:
                        <input type="text" value={formData.nombres} name="nombres" onChange={handleChange} />
                    </label>
                    <div>
                        <label>Tipo:
                            <select value={formData.tipo_user} name="tipo_user" onChange={handleChange}>
                                <option value="Jefe">Jefe</option>
                                <option value="Admin">Admin</option>
                                <option value="Responsable">Responsable</option>
                            </select>
                        </label>
                        <label>Condición:
                            <select value={formData.condicion} name="condicion" onChange={handleChange}>
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
                            <input type="text" value={formData.profesion} name="profesion" onChange={handleChange} />
                        </label>
                        <label>Servicio:
                            <input type="text" value={formData.servicio} name="servicio" onChange={handleChange} />
                        </label>
                    </div>
                    <label>Celular:
                        <input type="text" value={formData.celular} name="celular" onChange={handleChange} />
                    </label>
                    <div className="selec-cita">
                        <label>Especialidad en citas:
                            <select value={formData.especial_cita} name="especial_cita" onChange={handleChange}>
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
                    </div>

                    <label className="check-btn">Asignar Turno:
                        <input type="checkbox" checked={assignShift} onChange={() => setAssignShift(!assignShift)} />
                    </label>

                    <div className="modal-actions">
                        <button type="submit" className="btn-save">Guardar</button>
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                    </div>
                </form>

                {assignShift && <TurnoPersonal personData={personData} cerrarTblTurno={cerrarTblTurno}/>}
            </div>
        </div>
    );
};

export default EditPersonales;
