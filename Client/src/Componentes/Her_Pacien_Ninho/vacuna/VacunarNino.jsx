import React from 'react'
import styles from './VacunarNino.module.css'
import { Link, useLocation } from 'react-router-dom'
import NavLogin from '../../Navegadores/NavLogin';
import NavPie from '../../Navegadores/NavPie';
import { RiPlayReverseLargeFill } from "react-icons/ri";
 
const listaVacunas = [
  { nombreVacuna: 'Vacuna HVA (Hep)', codigo: '90633.01' },
  { nombreVacuna: 'Influenza con Comorbilidad', codigo: '90657' },
  { nombreVacuna: 'Dosis Unica Neumococo', codigo: '90670' },
  { nombreVacuna: 'SPR 1ra', codigo: '90707' },
  { nombreVacuna: 'BARRIDO SR - 2016', codigo: '90708' },
  { nombreVacuna: 'Antipolio IPV 1ra', codigo: '90713' },
  { nombreVacuna: 'Varicela 1ra Dosis', codigo: '90716' },
  { nombreVacuna: 'Varicela Vacunacion [CONTROL]', codigo: '90716' },
  { nombreVacuna: 'Antiamarilica <5a', codigo: '90717' },
  { nombreVacuna: 'Pentavalente 1ra', codigo: '90723' },
];

const VacunarNino = () => {
  const location = useLocation();
  const { paciente } = location.state || {}; // Evita errores si no hay datos

  const handleGuardar = (vacuna) => {
    alert(`Datos guardados para ${vacuna.nombreVacuna}`);
  };

  return (
    <div>
      <NavLogin />

      <div className={styles.contPrincipal}>
        <div className={styles.btn}> 
          <Link to={`/panel/${paciente?.hist_clinico || ''}`} className={styles.volver_link}>
          <RiPlayReverseLargeFill /> VOLVER
          </Link>
        </div>
        <h1 className={styles.titulo}>VACUNAR NIÑO - {paciente.hist_clinico}</h1>
        <div className={styles.container}>
          {listaVacunas.map((vacuna, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.header}>
                <span>{vacuna.nombreVacuna} ({vacuna.codigo})</span>
                <button className={styles.closeButton}>X</button>
              </div>
              <div className={styles.bodyx}>
                <label>Fecha:</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className={styles.inputDate}
                />
                <div className={styles.inputs}>
                  <div>
                    <label>Dx02</label>
                    <input type="text" className={styles.inputField} />
                  </div>
                  <div>
                    <label>Lab2</label>
                    <input type="text" className={styles.inputField} />
                  </div>
                </div>
              </div>
              <button onClick={() => handleGuardar(vacuna)} className={styles.saveButton}>
                Guardar
              </button>
            </div>
          ))}
        </div>
      </div>
      <NavPie />
    </div>

  );
};

export default VacunarNino;