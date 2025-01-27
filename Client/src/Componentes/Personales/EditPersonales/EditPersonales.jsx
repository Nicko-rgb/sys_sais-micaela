import React, { useState } from "react";
import "./EditPersonales.css";
import Store from '../../Store/Store_Cita_Turno'
import { CiEdit } from "react-icons/ci";
import { LuMapPinPlus } from "react-icons/lu";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const EditPersonales = ({ personData, onSave, onClose, openMaps }) => {
    const [formData, setFormData] = useState({ ...personData });
    const [maps, setMaps] = useState(false);
    const { especialidades } = Store()

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

    const closeEdit = (personal) => {
        onClose();
        openMaps(personal)
    }

    return (
        <div className="personal-edit">
            <div className="edit-content">
                <nav>
                    <button className='active' ><CiEdit style={{ fontSize: '18px' }} />Editar Datos</button>
                    <button onClick={() => closeEdit(personData)}  ><LuMapPinPlus style={{ fontSize: '17' }} />Asignar Sector</button>
                </nav>
                <form className="form-personal" onSubmit={handleSubmit}>
                    <h3>Editar Datos Personales</h3>
                    <div className="center">
                        <div className="left-e">
                            <div>
                                <label>DNI:
                                    <input type="text" name="dni" value={formData.dni} onChange={handleChange} maxLength={"8"} pattern='\d{8}' />
                                </label>
                                <label>Nombre:
                                    <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} />
                                </label>
                            </div>
                            <div>
                                <label>Apellido Paterno:
                                    <input type="text" name="paterno" value={formData.paterno} onChange={handleChange} />
                                </label>
                                <label>Apellido Materno:
                                    <input type="text" name="materno" value={formData.materno} onChange={handleChange} />
                                </label>
                            </div>
                            <div>
                                <label>Celular:
                                    <input type="text" name="celular" value={formData.celular} onChange={handleChange} />
                                </label>
                                <label>Correo:
                                    <input id="email" type="text" name="correo" value={formData.correo} onChange={handleChange} />
                                </label>
                            </div>
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
                        </div>
                        <div className="right-e">
                            <div>
                                <label>Profesión:
                                    <input type="text" name="profesion" value={formData.profesion} onChange={handleChange} />
                                </label>
                                <label>Servicio:
                                    <input type="text" name="servicio" value={formData.servicio} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="selec-cita">
                                <label>Especialidad en citas:
                                    <select name="especial_cita" value={formData.especial_cita} onChange={handleChange}>
                                        <option value="">Ninguno</option>
                                        {especialidades.map((esp => (
                                            <option key={esp.id} value={esp.id}>{esp.especialidad}</option>
                                        )))}
                                    </select>
                                </label>
                                {/* Mostrar N° Consultorio solo si hay especialidad seleccionada */}
                                {formData.especial_cita && (
                                    <label>N° Consultorio:
                                        <select name="num_consultorio" value={formData.num_consultorio} onChange={handleChange}>
                                            <option value="">Ninguno</option>
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

                            <div className="credenciales">
                                <fieldset>
                                    <legend>credenciales de acceso</legend>
                                    <div className="form-grid">
                                        <label>Usuario(DNI):
                                            <input type="text" name="usuario" value={formData.dni} onChange={handleChange} />
                                        </label>
                                        <label>Contraseña:
                                            <input type="text" name="contrasena" value={formData.contrasena} onChange={handleChange} />
                                        </label>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="btns">
                        <button type="submit" className="btn-save"><IoCheckmarkDoneOutline style={{ fontSize: '18px' }} />Guardar</button>
                        <button type="button" className="btn-cancela" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPersonales;