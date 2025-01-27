import React, { useState } from "react";
import style from "./HistorialPsicomotor.module.css";
import NavLogin from "../../Navegadores/NavLogin";
import NavPie from "../../Navegadores/NavPie";
import { Link } from "react-router-dom";
import { RiPlayReverseLargeFill } from "react-icons/ri"; // Importar el ícono correctamente
import EvaluacionPsicomotor from "./EvaluacionPsicomotor";

const HistorialPsicomotor = ({ paciente, cambiarVista }) => {
  const [search, setSearch] = useState("");

  return (
    <div className={style.bodyformularios}>
      <NavLogin />
      <div className={style.historialcontainer}>
        {paciente ? (
          <>
            <h3>Historial de Evaluación Psicomotor</h3>
            <div className={style.controls}>
              <input
                type="text"
                placeholder="Buscar registro:"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <div className={style.dropdown}>
                <button className={style.dropdownbutton}>⚙</button>
                <div className={style.dropdownmenu}>
                  <button
                    onClick={() =>
                      cambiarVista(<EvaluacionPsicomotor paciente={paciente} />)
                    }
                  >
                    + Nuevo Niño Psicomotor
                  </button>
                </div>
              </div>
            </div>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Edad</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Fec. Atenc.</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className={style.nodata}>
                    No hay datos disponibles
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={style.pagination}>
              <span>Mostrando 0 a 0 de 0 registros</span>
              <div>
                <button disabled>Primero</button>
                <button disabled>{"<"}</button>
                <button disabled>{">"}</button>
                <button disabled>Último</button>
              </div>
            </div>
          </>
        ) : (
          <p>No hay datos..</p>
        )}
      </div>
      <NavPie />
    </div>
  );
};

export default HistorialPsicomotor;
