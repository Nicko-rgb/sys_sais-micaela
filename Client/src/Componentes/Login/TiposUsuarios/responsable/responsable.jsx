// Personal.js
import React from 'react';
import EstadoSesion from "../../../Complementos/EstadoSesion";
import './responsable.css';

const Responsable = () => {
  const nombre = '';
  const dni = '45678912';
  const email = 'ana.rodriguez@hospital.com';
  const telefono = '+51 987 654 321';
  const especialidad = 'Cardiología';
  const horario = 'Lunes a Viernes, 8:00 AM - 4:00 PM';
  const fechaIngreso = '15/03/2015';
  const estado = 'Activo';
  const departamento = 'Cardiología';
  const imagenPerfil = 'https://i.pinimg.com/1200x/b3/b8/57/b3b85713a822ad3e2c5e1eb74af91554.jpg'; // Aquí puedes poner una URL válida de una imagen

  const { userPersonal, tipoUser} = EstadoSesion(); 

  return (
    <div className="profile-container">
      <h2>Perfil del Personal - {tipoUser}</h2>
      <div className="info-container">
        <div className="profile-header">
          <img src={imagenPerfil} alt="Foto de perfil" className="profile-picture" />
          <div>
            <h3>Dra. {userPersonal}</h3>
            <p className={`status ${estado === 'Activo' ? 'active' : 'inactive'}`}>{estado}</p>
          </div>
        </div>
        <div className="profile-details">
          <p><strong>DNI:</strong> {dni}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Teléfono:</strong> {telefono}</p>
          <p><strong>Especialidad:</strong> {especialidad}</p>
          <p><strong>Departamento:</strong> {departamento}</p>
          <p><strong>Horario de trabajo:</strong> {horario}</p>
          <p><strong>Fecha de ingreso:</strong> {fechaIngreso}</p>
        </div>
        <button className="edit-button">Editar Información</button>
      </div>
    </div>
  );
};

export default Responsable;