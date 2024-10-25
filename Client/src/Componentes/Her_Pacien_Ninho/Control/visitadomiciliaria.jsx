import React from "react";
import "./estilosGeneralControl.css"

const VisitaDomiciliaria = () => {
    return (
        <div className="visitadomiciliaria-container">
            <div className="visitadomiciliaria-formulario">
                <form>
                    <h2 className="visitadomiciliaria-titulo">Visita Domiciliaria - Registrar</h2>

                    <div className="visitadomiciliaria-efectividad">
                        <label className="visitadomiciliaria-radio-box">
                            <input
                                type="radio"
                                id="efectiva"
                                name="efectividad"
                                value="Efectiva"
                            />
                            <span>Efectiva</span>
                        </label>

                        <label className="visitadomiciliaria-radio-box">
                            <input
                                type="radio"
                                id="noEfectiva"
                                name="efectividad"
                                value="No Efectiva"
                            />
                            <span>No Efectiva</span>
                        </label>
                    </div>

                    <div>
                        <label className="visitadomiciliaria-label"># Visita:</label>
                        <input
                            type="number"
                            name="visita"
                            className="visitadomiciliaria-input"
                            disabled
                        />
                    </div>

                    <div>
                        <label className="visitadomiciliaria-label">Fecha Atención:</label>
                        <input
                            type="date"
                            name="fechaAtencion"
                            className="visitadomiciliaria-input"
                        />
                    </div>

                    <div>
                        <label className="visitadomiciliaria-label">Opcional:</label>
                        <select
                            name="opcional"
                            className="visitadomiciliaria-select"
                        >
                            <option value="Sin Motivo Opcional">Sin Motivo Opcional</option>
                            <option value="Con Motivo">Supervicion CRED</option>
                            <option value="Sin Motivo Opcional">Supervision Suplementacion</option>
                            <option value="Con Motivo">Con Motivo</option>
                            <option value="Sin Motivo Opcional">Visita por Anemia</option>
                        </select>
                    </div>

                    <div>
                        <label className="visitadomiciliaria-label">Observaciones:</label>
                        <textarea
                            name="observaciones"
                            className="visitadomiciliaria-textarea"
                        />
                    </div>

                    <div className="visitadomiciliaria-botones">
                        <button type="submit" className="visitadomiciliaria-guardar">Guardar</button>
                        <button type="button" className="visitadomiciliaria-cancelar">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VisitaDomiciliaria;
