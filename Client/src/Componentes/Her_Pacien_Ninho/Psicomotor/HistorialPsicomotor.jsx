import React, { useState } from "react";
import style from "./HistorialPsicomotor.module.css";
// import NavLogin from "../../Navegadores/NavLogin";
// import NavPie from "../../Navegadores/NavPie";

const HistorialPsicomotor = () => {
    const [search, setSearch] = useState("");

    return (
        <div className={style.historialcontainer}>
            <h3>Historial de Evaluación Psicomotor</h3>
            <div className={style.controls}>
                <input
                    type="text"
                    placeholder="Buscar registro:"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />
                <button className={style.newbutton}>+ Nuevo NiñoPsicomotor</button>
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
        </div>
    );
};

export default HistorialPsicomotor;