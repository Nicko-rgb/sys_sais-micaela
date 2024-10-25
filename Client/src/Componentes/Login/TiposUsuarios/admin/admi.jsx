import React from 'react';
import EstadoSesion from "../../../Complementos/EstadoSesion";
import './admin.css';

const Administrador = () => {
  const nombre = 'Juan Pérez';
  const dni = '12345678';
  const email = 'juan.perez@hospital.com';
  const telefono = '+51 987 654 321';
  const rol = 'Administrador General'; 
  const fechaIngreso = '01/01/2010';
  const estado = 'Activo';
  const departamento = 'Administración';
  const imagenPerfil = 'https://i.pinimg.com/1200x/b3/b8/57/b3b85713a822ad3e2c5e1eb74af91554.jpg'; // Aquí puedes poner una URL válida de una imagen

  const { userPersonal, tipoUser} = EstadoSesion();

  return (
    <div className="profile-containerA">
      <h2>Perfil del {tipoUser}</h2>
      <div className="info-containerA">
        <div className="profile-headerA">
          <img src={imagenPerfil} alt="Foto de perfil" className="profile-picture" />
          <div>
            <h3>Dr. {userPersonal}</h3>
            <p className={`status ${estado === 'Activo' ? 'active' : 'inactive'}`}>{estado}</p>
          </div>
        </div>
        <div className="profile-details">
          <p><strong>DNI:</strong> {dni}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Teléfono:</strong> {telefono}</p>
          <p><strong>Rol:</strong> {rol}</p>
          <p><strong>Departamento:</strong> {departamento}</p>
          <p><strong>Fecha de ingreso:</strong> {fechaIngreso}</p>
        </div>
        {/* <button className="edit-button">Editar Información</button> */}
      </div>
    </div>
  );
};

export default Administrador;