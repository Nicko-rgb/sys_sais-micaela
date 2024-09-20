import React, { useState } from 'react';
import './Restablecer.css'; // Estilos externos para mantener un código limpio.

const Restablecer = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validación: Al menos 8 caracteres.
    if (newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password.length >= 8) {
      setSuccess('Contraseña restablecida con éxito.');
      // Aquí podrías hacer una llamada a tu backend para actualizar la contraseña.
    } else {
      setSuccess('');
      setError('Por favor, ingrese una contraseña válida.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="input-group">
          <label htmlFor="password">Nueva Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingrese nueva contraseña"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="submit-btn">Restablecer</button>
      </form>
    </div>
  );
};

export default Restablecer;
