import React from 'react'

const HistorialControles = ({paciente}) => {

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
