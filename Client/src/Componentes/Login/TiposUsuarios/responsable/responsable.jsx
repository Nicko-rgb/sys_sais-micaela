// Personal.js
import React from 'react';

const responsable = ({ nombre, dni, email, telefono, especialidad, horario, fechaIngreso, estado }) => {
  return (
    <div style={styles.profileContainer}>
      <h2>Perfil del Personal</h2>
      <div style={styles.infoContainer}>
        <p><strong>Nombre completo:</strong> {nombre}</p>
        <p><strong>DNI:</strong> {dni}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Teléfono:</strong> {telefono}</p>
        <p><strong>Especialidad:</strong> {especialidad}</p>
        <p><strong>Horario de trabajo:</strong> {horario}</p>
        <p><strong>Fecha de ingreso:</strong> {fechaIngreso}</p>
        <p><strong>Estado:</strong> {estado}</p>
      </div>
    </div>
  );
};

// Estilos en línea para mantener el diseño simple
const styles = {
  profileContainer: {
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
  },
  infoContainer: {
    lineHeight: '1.6',
    fontSize: '16px',
  }
};

export default responsable;
