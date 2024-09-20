import React, { useState } from 'react';
import styles from './contactAdmi.module.css';
// Importa tu archivo CSS con estilos de módulo

const ContactAdmi = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Aquí puedes manejar el envío de los datos, por ejemplo, a una API
  };

  return (
    <div className={styles.contactFormContainer}>
      <h2>Contactar al Administrador</h2>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>
    </div>
  );
};

export default ContactAdmi;
