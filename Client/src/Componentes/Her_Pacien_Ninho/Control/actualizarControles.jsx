import React, { useState } from "react";
import styles from "./ActualizarControles.module.css";
import { useNavigate } from "react-router-dom";
import NavLogin from '../../Navegadores/NavLogin';
import NavPie from '../../Navegadores/NavPie';
import OpcionesI from "../OpcionesI";
import { useLocation } from 'react-router-dom';

const ActualizarControles = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook de navegación
  const location = useLocation();
  const { paciente } = location.state || {}; // Evita errores si no hay datos

  const initialData = [
    { rangoEdad: "Rec Nacido", tipo: "DIA", max: 5, controles: '', libre: "Texto libre 1" },
    { rangoEdad: "Menor de 1 año", tipo: "MES", max: 7, controles: '', libre: "Texto libre 2" },
    { rangoEdad: "de 1 año", tipo: "MES", max: 10, controles: '', libre: "Texto libre 3" },
    { rangoEdad: "de 2 años", tipo: "MES", max: 8, controles: '', libre: "Texto libre 4" },
    { rangoEdad: "de 3 años", tipo: "MES", max: 6, controles: '', libre: "Texto libre 5" },
    { rangoEdad: "de 4 años", tipo: "MES", max: 6, controles: '', libre: "Texto libre 5" },
    { rangoEdad: "5 a 11 años", tipo: "AÑO", max: 6, controles: '', libre: "Texto libre 5" }
  ];

  const [data, setData] = useState(initialData);

  const handleInputChange = (index, event) => {
    const newData = [...data];
    newData[index].controles = event.target.value;
    setData(newData);
  };

  const handleCheckboxChange = (index, event) => {
    const newData = [...data];
    newData[index].libre = event.target.checked;
    setData(newData);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setShowDropdown(false);
  };

  const toggleDropdown = () => { 
    setShowDropdown(!showDropdown);
  };

  const irAControl = () => {
    if (paciente && paciente.hist_clinico) {
      navigate(`/control/${paciente.hist_clinico}`, { state: { paciente } });
    } else {
      console.error("Paciente no definido.");
    }
  };

  return (
    <div className={styles.tablaContainer}>
      <NavLogin />
      <OpcionesI paciente={paciente} />
      <div className={styles.tableWrapper}>
        <div className={styles.titulo}>
          <h2>Actualizar Controles Niños</h2>
          <div className={styles.botonesDerecha}>
            <button onClick={toggleModal}>¿Cómo funciona?</button>
            <div className={styles.dropdown}>
              <button onClick={toggleDropdown}>Opciones</button>
              {showDropdown && (
                <div className={styles.dropdownContent}>
                  <button onClick={irAControl}>Registrar control</button>
                  <button>Listar controles</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th>Rango de edad</th>
              <th>Tipo</th>
              <th>Max</th>
              <th>#Controles</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td>{row.rangoEdad}</td>
                <td>{row.tipo}</td>
                <td>{row.max}</td>
                <td>
                  <input
                    type="text"
                    value={row.controles}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.libre}
                    onChange={(event) => handleCheckboxChange(index, event)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={toggleModal}>
                &times;
              </span>
              <h3>Instrucciones</h3>
              <p>
                Esta tabla te permite actualizar los controles de los niños.
                ............................................................
              </p>
            </div>
          </div>
        )}
      </div>
      <NavPie />
    </div>
  );
};

export default ActualizarControles;