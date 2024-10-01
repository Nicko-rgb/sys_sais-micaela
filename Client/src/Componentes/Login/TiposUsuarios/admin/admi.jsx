import React, { useState } from 'react';

const Admi = () => {
  // Estado inicial del perfil del administrador
  const [profile, setProfile] = useState({
    name: 'Admin Name',
    email: 'admin@example.com',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Función para guardar los cambios
  const handleSave = (e) => {
    e.preventDefault();
    
    // Validaciones simples
    if (!profile.name || !profile.email) {
      setError('El nombre y el correo son obligatorios.');
      return;
    }
    
    if (profile.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Si las validaciones son correctas
    setError(''); // Limpiar mensaje de error
    console.log('Perfil actualizado:', profile);
    setIsEditing(false); // Desactiva el modo de edición después de guardar

    // Aquí podrías implementar la lógica para enviar los datos actualizados al backend
  };

  return (
    <div className="admi-profile">
      <h2>Perfil del Administrador</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mensaje de error */}
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing} // Deshabilitar el campo si no está en modo de edición
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing} // Deshabilitar el campo si no está en modo de edición
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            disabled={!isEditing} // Deshabilitar el campo si no está en modo de edición
          />
        </div>
        <button type="button" onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
        {isEditing && <button type="submit">Guardar Cambios</button>}
      </form>
    </div>
  );
};

export default Admi;
