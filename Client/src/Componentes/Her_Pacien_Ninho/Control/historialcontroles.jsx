import React from 'react'
import styles from './historial.module.css';

const HistorialControles = ({paciente}) => {
  // SIMULACION DE DATOS
  const datos = [
    {
      rangoEdad: "Rec Nacido",
      edad: "0 a, 00 m, 13 d",
      ctrl: 2,
      peso: "2.82 Kg",
      talla: "48.4 cm",
      pCef: "33.5 cm",
      pE: "N",
      tE: "N",
      pT: "N",
      otros: "LME, C.N",
      fecha: "02-01-2025",
      dias: 5,
    },
    {
      rangoEdad: "Rec Nacido",
      edad: "0 a, 00 m, 08 d",
      ctrl: 1,
      peso: "2.47 Kg",
      talla: "46.8 cm",
      pCef: "33.0 cm",
      pE: "DA",
      tE: "N",
      pT: "N",
      otros: "LME",
      fecha: "28-12-2024",
      dias: "-",
    },
  ];
  return (
    <div className={styles.tablaContainer}>
      {paciente ? (
        <>
          
            <h1>
              HISTORIAL CONTROLES ({paciente.nombres}) - ({paciente.hist_clinico})
            </h1>

        </>
      ) : (
        <p>No hay datos</p>
      )}
       <table className={styles.tabla}>
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
          {datos.map((fila, index) => (
            <tr key={index}>
              <td>{fila.rangoEdad}</td>
              <td>{fila.edad}</td>
              <td>{fila.ctrl}</td>
              <td className={parseFloat(fila.peso) > 2.5 ? styles.positivo : styles.negativo}>{fila.peso}</td>
              <td>{fila.talla}</td>
              <td>{fila.pCef}</td>
              <td>{fila.pE}</td>
              <td>{fila.tE}</td>
              <td>{fila.pT}</td>
              <td>{fila.otros}</td>
              <td>{fila.fecha}</td>
              <td>{fila.dias}</td>
              <td>{}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  )
}

export default HistorialControles
