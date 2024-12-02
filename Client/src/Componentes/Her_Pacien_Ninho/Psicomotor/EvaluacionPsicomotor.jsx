import React, { useState } from 'react';
import style from './EvaluacionPsicomotor.module.css'

const FormularioPsicomotor = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [observacion, setObservacion] = useState('');

  const handleGuardar = () => {
    alert(`Observación: ${observacion}\nFecha: ${fecha}`);
  };

  return (
    <div className={style.formulariocontainer}>
      <h2>Formulario - Desarrollo Psicomotor</h2>
      <div className={style.formulario}>
        <p className={style.formularioinstruccion}>
          Seleccione Normal, o el área donde presenta un Trastorno o Déficit
        </p>
        <div className={style.checkboxgroup}>
          <label><input type="checkbox" /> ED Normal</label>
          <label><input type="checkbox" /> T/D Motora</label>
          <label><input type="checkbox" /> T/D Lenguaje</label>
          <label><input type="checkbox" /> T/D Social</label>
          <label><input type="checkbox" /> T/D Coordinación</label>
          <label><input type="checkbox" /> T/D Cognitiva</label>
        </div>
        <div className={style.formgroup}>
          <label htmlFor="observacion">Observación:</label>
          <textarea
            id="observacion"
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
          />
        </div>
        <div className={style.formgroup}>
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <button className={style.btnguardar} onClick={handleGuardar}>Guardar</button>
      </div>
      <div className="notas">
        <p>✔ T/D: Trastorno / Déficit.</p>
        <p>✔ Puede seleccionar 2 o más áreas.</p>
        <p>✔ Si está normal o no, igual puede poner una observación que podrá ser vista en el siguiente control.</p>
      </div>
    </div>
  );
};

export default FormularioPsicomotor;
