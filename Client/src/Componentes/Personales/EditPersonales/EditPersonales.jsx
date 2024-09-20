import React, { useState } from "react";
import "./EditPersonales.css";

const EditPersonales = ({ personData, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...personData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Datos Personales</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="dni">DNI:</label>
            <input
              type="text"
              id="dni" 
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidos">Apellido Paterno:</label>
            <input
              type="text"
              id="paterno"
              name="paterno"
              value={formData.paterno}
              onChange={handleChange}
            />
            <label htmlFor="apellidos">Apellido materno:</label>
            <input
              type="text"
              id="materno"
              name="materno"
              value={formData.materno}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profesion">Profesión:</label>
            <input
              type="text"
              id="profesion"
              name="profesion"
              value={formData.profesion}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servicio">Servicio:</label>
            <input
              type="text"
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="condicion">Condición:</label>
            <input
              type="text"
              id="condicion"
              name="condicion"
              value={formData.condicion}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="celular">Celular:</label>
            <input
              type="text"
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-save">
              Guardar
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonales;
