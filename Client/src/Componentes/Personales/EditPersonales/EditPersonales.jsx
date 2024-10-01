import React, { useState } from "react";
import "./EditPersonales.css";
import TurnoPersonal from '../Turnos/TurnosPersonal';
import Sector from '../Sectores/Sector';

const EditPersonales = ({ personData, onSave, onClose }) => {
    const [formData, setFormData] = useState({ ...personData });
    const [activeModal, setActiveModal] = useState('edit'); // Default to 'edit'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviar los datos al servidor usando fetch
        fetch('http://localhost:5000/api/update-personal', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message); // Mostrar mensaje de éxito
                    onSave(formData); // Llamar a la función de guardado en el cliente si es necesario
                } else {
                    alert('Error al actualizar los datos');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleOpenModal = (modal) => {
        setActiveModal(modal);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <nav>
                    <button className={activeModal === 'edit' ? 'active' : ''} onClick={() => handleOpenModal('edit')}>Editar</button>
                    <button className={activeModal === 'turno' ? 'active' : ''} onClick={() => handleOpenModal('turno')}>Asignar Turno</button>
                    <button className={activeModal === 'sector' ? 'active' : ''} onClick={() => handleOpenModal('sector')}>Asignar Sector</button>
                </nav>
                {activeModal === 'edit' && (
                    <form className="form-personal" onSubmit={handleSubmit}>
                        <h3>Editar Datos Personales</h3>
                        <label>DNI:
                            <input type="text" name="dni" value={formData.dni} onChange={handleChange} />
                        </label>
                        <div>
                            <label>Apellido Paterno:
                                <input type="text" name="paterno" value={formData.paterno} onChange={handleChange} />
                            </label>
                            <label>Apellido Materno:
                                <input type="text" name="materno" value={formData.materno} onChange={handleChange} />
                            </label>
                        </div>
                        <label>Nombre:
                            <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} />
                        </label>
                        <div>
                            <label>Tipo:
                                <select name="tipo_user" value={formData.tipo_user} onChange={handleChange}>
                                    <option value="Jefe">Jefe</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Responsable">Responsable</option>
                                </select>
                            </label>
                            <label>Condición:
                                <select name="condicion" value={formData.condicion} onChange={handleChange}>
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
                                <input type="text" name="profesion" value={formData.profesion} onChange={handleChange} />
                            </label>
                            <label>Servicio:
                                <input type="text" name="servicio" value={formData.servicio} onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>Celular:
                                <input type="text" name="celular" value={formData.celular} onChange={handleChange} />
                            </label>
                            <label>Correo:
                                <input type="text" name="correo" value={formData.correo} onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>Usuario:
                                <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} />
                            </label>
                            <label>Contraseña:
                                <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} />
                            </label>
                        </div>
                        <div className="selec-cita">
                            <label>Especialidad en citas:
                                <select name="especial_cita" value={formData.especial_cita} onChange={handleChange}>
                                    <option value="">Ninguno</option>
                                    <option value="Enfermería">Enfermería</option>
                                    <option value="Medicina">Medicina</option>
                                    <option value="Psicología">Psicología</option>
                                    <option value="Nutrición">Nutrición</option>
                                    <option value="Odontología">Odontología</option>
                                    <option value="Planificación">Planificación</option>
                                    <option value="Obstetricia_CPN">Obstetricia_CPN</option>
                                </select>
                            </label>
                            {/* Mostrar N° Consultorio solo si hay especialidad seleccionada */}
                            {formData.especial_cita && (
                                <label>N° Consultorio:
                                    <select name="num_consultorio" value={formData.num_consultorio || ''} onChange={handleChange}>
                                        <option value="1">1</option>
                                        {/* Mostrar opción 2 solo si la especialidad es Enfermería, Medicina o Odontología */}
                                        {(formData.especial_cita === 'Enfermería' ||
                                            formData.especial_cita === 'Medicina' ||
                                            formData.especial_cita === 'Odontología') && (
                                                <option value="2">2</option>
                                            )}
                                    </select>
                                </label>
                            )}

                        </div>
                        <div className="modal-actions">
                            <button type="submit" className="btn-save">Guardar</button>
                            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        </div>
                    </form>
                )}
                {activeModal === 'turno' && <TurnoPersonal personData={personData} onClose={onClose} />}
                {activeModal === 'sector' && <Sector onClose={onClose} />}
            </div>
        </div>
    );
};

export default EditPersonales;
