import React, { useState } from 'react';
import './estilosGeneralControl.css'; // Asegúrate de crear un archivo CSS con este nombre 

const ListarControles = () => {
  // Datos de ejemplo para la tabla
  const [controles, setControles] = useState([
    { id: 1, rangoEdad: 'Rec Nacido', edad: '0 a, 00 m, 11 d', ctrl: 2, peso: '3.50 Kg.', talla: '53.0 cm.', pCef: '36.4 cm.', pe: 'N', te: 'N', pt: 'N', otros: 'LME', fecha: '14-10-2024', dias: '4' },
    { id: 2, rangoEdad: 'Rec Nacido', edad: '0 a, 00 m, 07 d', ctrl: 1, peso: '3.35 Kg.', talla: '51.9 cm.', pCef: '35.0 cm.', pe: 'N', te: 'N', pt: 'N', otros: 'LME', fecha: '10-10-2024', dias: '-' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Función para filtrar registros según el término de búsqueda
  const filteredControles = controles.filter(control =>
    control.rangoEdad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="listar-controles">
      <h2>Lista de Controles</h2>
      <div className="search-container">
        <label htmlFor="search">Buscar registro:</label>
        <input
          type="text"
          id="search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table-controles">
        <thead>
          <tr>
            <th>Rango Edad</th>
            <th>Edad</th>
            <th>Ctrl</th>
            <th>Peso</th>
            <th>Talla</th>
            <th>Ptro. Cef.</th>
            <th>P/E</th>
            <th>T/E</th>
            <th>P/T</th>
            <th>Otros</th>
            <th>Fecha</th>
            <th>Días</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredControles.length > 0 ? (
            filteredControles.map(control => (
              <tr key={control.id}>
                <td>{control.rangoEdad}</td>
                <td>{control.edad}</td>
                <td>{control.ctrl}</td>
                <td>{control.peso}</td>
                <td>{control.talla}</td>
                <td>{control.pCef}</td>
                <td>{control.pe}</td>
                <td>{control.te}</td>
                <td>{control.pt}</td>
                <td>{control.otros}</td>
                <td>{control.fecha}</td>
                <td>{control.dias}</td>
                <td>
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No se encontraron registros</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <span>Mostrando 1 a {filteredControles.length} de {controles.length} registros</span>
        {/* Botones de paginación (agrega funcionalidad si es necesario) */}
        <button>{'<'}</button>
        <button>{'>'}</button>
      </div>
    </div>
  );
};

export default ListarControles;
