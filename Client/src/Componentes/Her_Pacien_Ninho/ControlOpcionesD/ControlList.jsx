import React, { useState } from 'react';
import styles from './ControList.module.css';
import OpcionesD from '../OpcionesD';
import OpcionesI from '../OpcionesI';
import NavLogin from '../../Navegadores/NavLogin';
import NavPie from '../../Navegadores/NavPie';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

const ControlList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedName, setSelectedName] = useState('Aaron');
  const [showCount, setShowCount] = useState(10);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const { paciente } = location.state || {};

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleShowCountChange = (event) => {
    setShowCount(event.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.mainContainer}>
      {/* NavLogin at the top */}
      <NavLogin />

      <div className={styles.contentWrapper}>
        {/* OpcionesI Sidebar */}
        <div className={styles.sidebarLeft}>
          <OpcionesI />
        </div>

        {/* Main content area */}
        <div className={styles.mainContent}>
          <div className={styles.container}>
            <h3>Lista de Controles</h3>
            <header className={styles.header}>
              <input
                type="date"
                className={styles.dateInput}
                value={selectedDate.toISOString().substr(0, 10)}
                onChange={handleDateChange}
              />
              <div className={styles.userInfo}>
                <select
                  className={styles.nameSelect}
                  value={selectedName}
                  onChange={handleNameChange}
                >
                  <option value="Aaron">Aaron</option>
                  <option value="John">John</option>
                  <option value="Jane">Jane</option>
                </select>
                <button className={styles.printButton} onClick={toggleMenu}>
                  Imprimir
                </button>
                {/* Menú de opciones */}
                {isMenuOpen && (
                  <div className={styles.menu}>
                    <ul>
                      <li>Registro Diario CRED</li>
                      <li>Registro Diario Vacuna</li>
                      <li>Exportar Varios</li>
                    </ul>
                  </div>
                )}
              </div>
            </header>

            <div className={styles.searchBar}>
              <input className={styles.searchInput} placeholder="Buscar registro" />
              <select className={styles.showSelect} value={showCount} onChange={handleShowCountChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Historia</th>
                  <th className={styles.th}>Nombre</th>
                  <th className={styles.th}>Edad</th>
                  <th className={styles.th}>Grupo</th>
                  <th className={styles.th}>Ctrl</th>
                  <th className={styles.th}>(PE) Peso</th>
                  <th className={styles.th}>(TE) Talla</th>
                  <th className={styles.th}>(TP)</th>
                  <th className={styles.th}>P.C.</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.row}>
                  <td className={styles.cell}>No hay datos disponibles</td>
                  <td className={styles.cell}>No hay datos disponibles</td>
                  <td className={styles.cell}>No hay datos disponibles</td>
                  <td className={styles.cell}>No hay datos disponibles</td>
                  <td className={styles.cell}>No hay datos disponibles</td>
                  <td className={styles.cell}>No hay datos disponibles</td>
                  <td className={styles.cell}>No hay datos disponibles</td>
                  <td className={styles.cell}>No hay datos disponibles</td>
                  <td className={styles.cell}>No hay datos disponibles</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.pagination}>
              <button className={styles.paginationButton}>Primero</button>
              <button className={styles.paginationButton}>-</button>
              <button className={styles.paginationButton}>+</button>
              <button className={styles.paginationButton}>Último</button>
            </div>
          </div>
        </div>

        {/* OpcionesD Sidebar */}
        <div className={styles.sidebarRight}>
          <OpcionesD />
        </div>
      </div>

      {/* NavPie at the bottom */}
      <NavPie />
    </div>
  );
};

export default ControlList;