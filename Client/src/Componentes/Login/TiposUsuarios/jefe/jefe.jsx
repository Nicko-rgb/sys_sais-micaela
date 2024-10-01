// Jefe.js
import React from 'react';
import PropTypes from 'prop-types';

const Jefe = ({ nombre, edad, especialidad, experiencia, identificacion, telefono, email, editarJefe }) => {
  return (
    <div style={styles.container}>
      <h2>Detalles del Jefe de la Posta Médica</h2>
      <p><strong>Nombre:</strong> {nombre}</p>
      <p><strong>Edad:</strong> {edad} años</p>
      <p><strong>Especialidad:</strong> {especialidad}</p>
      <p><strong>Años de Experiencia:</strong> {experiencia} años</p>
      <p><strong>ID:</strong> {identificacion}</p>
      <p><strong>Teléfono:</strong> {telefono}</p>
      <p><strong>Email:</strong> {email}</p>
      <button onClick={editarJefe} style={styles.button}>Editar Información</button>
    </div>
  );
};

// Definir los tipos de props
Jefe.propTypes = {
  nombre: PropTypes.string.isRequired,
  edad: PropTypes.number.isRequired,
  especialidad: PropTypes.string.isRequired,
  experiencia: PropTypes.number.isRequired,
  identificacion: PropTypes.string.isRequired,
  telefono: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  editarJefe: PropTypes.func.isRequired
};

// Estilos en línea (opcional)
const styles = {
  container: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9'
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Jefe;
