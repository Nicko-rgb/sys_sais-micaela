import React, { useEffect, useState } from "react";
import styles from "./actulizar.module.css"
const ActualizarVisitaDomiciliaria = ({ idVisita, onClose }) => {
    console.log(idVisita); // Verifica si el ID está llegando correctamente
  const [formData, setFormData] = useState({
    tipo: "",
    numero_visita: "",
    fecha_atencion: "",
    opcional: "",
    observaciones: "",
  });

  const [showModal, setShowModal] = useState(false);

  // Efecto para obtener los datos de la visita al abrir el modal
  useEffect(() => {
    if (!idVisita) return;
    const fetchVisitaData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/visita-general-domiciliaria/${idVisita}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la visita");
        }
        const data = await response.json();
        const visita = data.visitas[0];  // Accede al primer objeto



    // Convertir la fecha al formato YYYY-MM-DD
    const fechaAtencion = visita.fecha_atencion
    ? visita.fecha_atencion.split('T')[0] // Obtener solo la parte de la fecha
    : "";
        setFormData({
          tipo: visita.tipo || "",
          numero_visita: visita.numero_visita || "",
          fecha_atencion: fechaAtencion || "",
          opcional: visita.opcional || "",
          observaciones: visita.observaciones || "",
        });
        console.log(formData);  // Verifica los datos que están en formData
      } catch (error) {
        console.error("Error al obtener la visita:", error);
      }
    };
    fetchVisitaData();
  }, [idVisita]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tipo || !formData.fecha_atencion) {
      alert("Debe completar los campos requeridos");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/visita-general-domiciliaria/${idVisita}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la visita");
      }

      const result = await response.json();
      console.log("Visita actualizada:", result);
      alert("¡Visita actualizada con éxito!");
      setShowModal(false); // Ocultar modal al actualizar
      if (onClose) onClose(); // Llamar al callback de cierre si existe
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un problema al actualizar la visita.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Actualizar Visita Domiciliaria</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo:</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="tipo"
                  value="Efectiva"
                  checked={formData.tipo === "Efectiva"}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                Efectiva
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="tipo"
                  value="No Efectiva"
                  checked={formData.tipo === "No Efectiva"}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                No Efectiva
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}># Visita:</label>
            <input 
              type="number" 
              value={formData.numero_visita} 
              readOnly 
              disabled 
              className={styles.inputDisabled}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha Atención:</label>
            <input
              type="date"
              name="fecha_atencion"
              value={formData.fecha_atencion}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Opcional:</label>
            <select
              name="opcional"
              value={formData.opcional}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="Sin Motivo Opcional">Sin Motivo Opcional</option>
              <option value="Supervision CRED">Supervisión CRED</option>
              <option value="Supervision Suplementacion">Supervisión Suplementación</option>
              <option value="Visita por Anemia">Visita por Anemia</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Observaciones:</label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              className={styles.textarea}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.buttonSubmit}>
              Actualizar
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className={styles.buttonCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarVisitaDomiciliaria;
