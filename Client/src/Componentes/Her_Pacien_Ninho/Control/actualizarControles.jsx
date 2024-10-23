import React, { useState } from "react";
import "./estilosGeneralControl.css";
import { useNavigate } from "react-router-dom";

const ActualizarControles = () => {

  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook de navegación

  const initialData = [
    {
      rangoEdad: "Rec Nacido", tipo: "DIA", max: 5, controles: '',libre: "Texto libre 1",},
    {
      rangoEdad: "Menor de 1 año",tipo: "MES",max: 7,controles: '',libre: "Texto libre 2",},
    {
      rangoEdad: "de 1 año",tipo: "MES",max: 10,controles: '',libre: "Texto libre 3",},
    {
      rangoEdad: "de 2 años",tipo: "MES",max: 8,controles: '',libre: "Texto libre 4",},
    {
      rangoEdad: "de 3 años",tipo: "MES",max: 6,controles: '',libre: "Texto libre 5",},
    {
      rangoEdad: "de 4 años",tipo: "MES",max: 6,controles: '',libre: "Texto libre 5",},
    {
      rangoEdad: "5 a 11 años",tipo: "AÑO",max: 6,controles: '',libre: "Texto libre 5",}
  ];

  const [data, setData] = useState(initialData);

  // Función para manejar cambios en los inputs de la columna '#Controles'
  const handleInputChange = (index, event) => {
    const newData = [...data];
    newData[index].controles = event.target.value;
    setData(newData);
  };

  // Función para manejar cambios en los checkboxes de la columna 'Libre'
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

  const iraControl = () => {
    navigate("/control"); // Redirige a la ruta de "historialVisita"
  };

  return (
    <div className="tabla-container">
      <div className="table-wrapper">
        <div className="titulo">
          <h2>Actualizar Controles Niños</h2>
          <div className="botones-derecha">
            {/* Botón para mostrar el modal */}
            <button onClick={toggleModal}>¿Cómo funciona?</button>

            {/* Botón para desplegar opciones */}
            <div className="dropdown">
              <button onClick={toggleDropdown}>Opciones</button>
              {showDropdown && (
                <div className="dropdown-content">
                  <button onClick={iraControl}>Registrar control</button>
                  <button>Listar controles</button>
                </div>
              )}
            </div>
          </div>
        </div>
       <table className="custom-table">
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
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
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
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>
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
    </div>
  );
};

export default ActualizarControles;