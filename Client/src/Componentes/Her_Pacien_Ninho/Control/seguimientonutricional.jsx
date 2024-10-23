import React from "react";
import "./estilosGeneralControl.css";

const Seguimientonutricional = () => { 
  return (
    <div className="seguimiento-Nutricional">
      <form className="seguimiento-form" action="">
        <div className="seguimiento-titulo">
          <h3>Control Niño(a) - SEGUIM. NUTRICIONAL</h3>
          <div className="seguimiento-botonconfiguracion">
            <button type="button">Configuración</button>
          </div>
        </div>

        {/* Primer bloque: Control CRED */}
        <fieldset className="seguimiento-primerbloque">
          <legend>Control CRED - Rec NAcido</legend>
          <div className="seguimiento-control">
            <label htmlFor="controlNumber">N° Control</label>
            <input type="text" id="controlNumber" />
          </div>
          <div className="seguimiento-control">
            <label htmlFor="fechaAtencion">Fec Atención</label>
            <input type="date" id="fechaAtencion" />
          </div>
        </fieldset>

        {/* Segundo bloque: Medidas */}
        <fieldset className="seguimiento-segundobloque">
          <legend>Medidas del Niño(a)</legend>
          <div className="seguimiento-control">
            <label htmlFor="peso">Peso:</label>
            <input type="text" id="peso" />
          </div>
          <div className="seguimiento-control">
            <label htmlFor="talla">Talla:</label>
            <input type="text" id="talla" />
          </div>
          <div className="seguimiento-control">
            <label htmlFor="perCefalico">Per. Cefálico:</label>
            <input type="text" id="perCefalico" />
          </div>
        </fieldset>

        {/* Tercer bloque: Consejería y Sesión */}
        <fieldset className="seguimiento-tercerbloque">
          <legend>Servicios</legend>
          <div className="seguimiento-control">
            <input type="checkbox" id="consejeriaNutricional" />
            <label htmlFor="consejeriaNutricional">Consejería Nutricional</label>
            <input type="checkbox" id="estimulacionTemprana" />
            <label htmlFor="estimulacionTemprana">Estimulación Temprana</label>
          </div>
          <div className="seguimiento-control">
            <label htmlFor="sesion">Sesión</label>
            <input type="text" id="sesion" />
          </div>
        </fieldset>

        {/* Cuarto bloque: Próxima Cita */}
        <fieldset className="seguimiento-cuartobloque">
          <legend>Próxima Cita</legend>
          <div className="seguimiento-control">
            <label htmlFor="proximaCita">Próx Cita ()</label>
            <input type="date" id="proximaCita" />
          </div>
          <div className="seguimiento-control">
            <label htmlFor="citados">- # Citados:</label>
            <input type="text" id="citados" />
          </div>
        </fieldset>

        {/* Botones de acción */}
        <div className="seguimiento-botones">
          <button type="submit">Guardar</button>
          <button type="reset">Reset</button>
          <button type="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Seguimientonutricional;
