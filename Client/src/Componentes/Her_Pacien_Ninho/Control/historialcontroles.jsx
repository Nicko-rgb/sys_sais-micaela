import React from 'react'
import { useLocation } from "react-router-dom";

const HistorialControles = () => {

  const location = useLocation();
  const { paciente } = location.state || {}; // Evita errores si no hay datos

  return (
    <div>
      {paciente ? (
        <>
          
            <h1>
              HISTORIAL CONTROLES ({paciente.nombres}) - ({paciente.hist_clinico})
            </h1>

        </>
      ) : (
        <p>No hay datos</p>
      )}


    </div>
  )
}

export default HistorialControles
