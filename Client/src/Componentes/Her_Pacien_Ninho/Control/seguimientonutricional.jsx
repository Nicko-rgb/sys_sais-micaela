import React from "react";
import styles from "./SeguimientoNutricional.module.css";
import NavLogin from "../../Navegadores/NavLogin";
import NavPie from "../../Navegadores/NavPie";
import { Link } from "react-router-dom";
import { RiPlayReverseLargeFill } from "react-icons/ri";

const Seguimientonutricional = ({ paciente }) => {
  return (
    <div className={styles.contPadre}>
      <NavLogin />
      <div className={styles.contenidoPrincipal}>
        {paciente ? (
          <>
            <div className={styles.container}>
              <form className={styles.seguimientoForm} action="">
                <div className={styles.seguimientoTitulo}>
                  <h3>({paciente.nombres}) - SEGUIM. NUTRICIONAL</h3>
                  <div className={styles.seguimientoBotonconfiguracion}>
                    <button type="button">Configuración</button>
                  </div>
                </div>

                {/* Primer bloque: Control CRED */}
                <fieldset className={styles.seguimientoPrimerbloque}>
                  <legend>Control CRED - Rec NAcido</legend>
                  <div className={styles.seguimientoControlRow}>
                    <div className={styles.seguimientoControl}>
                      <label htmlFor="controlNumber">N° Control</label>
                      <input type="text" id="controlNumber" />
                    </div>
                    <div className={styles.seguimientoControl}>
                      <label htmlFor="fechaAtencion">Fec Atención</label>
                      <input type="date" id="fechaAtencion" />
                    </div>
                  </div>
                </fieldset>

                {/* Segundo bloque: Medidas */}
                <fieldset className={styles.seguimientoSegundobloque}>
                  <legend>Medidas del Niño(a)</legend>
                  <div className={styles.seguimientoControlRow}>
                    <div className={styles.seguimientoControl}>
                      <label htmlFor="peso">Peso:</label>
                      <input type="text" id="peso" />
                    </div>
                    <div className={styles.seguimientoControl}>
                      <label>Talla:</label>
                      <input type="text" id="talla" />
                    </div>
                    <div className={styles.seguimientoControl}>
                      <label htmlFor="perCefalico">Per. Cefálico:</label>
                      <input type="text" id="perCefalico" />
                    </div>
                  </div>
                </fieldset>
                {/* Bloques de "Servicios" y "Próxima Cita" en una fila */}
                <div className={styles.seguimientoUltimosBloques}>
                  {/* Tercer bloque: Servicios */}
                  <fieldset className={styles.seguimientoTercerbloque}>
                    <legend>Servicios</legend>
                    <div className={styles.seguimientoControl}>
                      <div>
                        <label>
                          Consejería Nutricional{" "}
                          <input type="checkbox" id="consejeriaNutricional" />{" "}
                        </label>
                      </div>

                      <label>
                        Estimulación Temprana{" "}
                        <input type="checkbox" id="estimulacionTemprana" />
                      </label>

                      <label>Sesión: </label>
                      <input type="text" id="sesion" />
                    </div>
                  </fieldset>

                  {/* Cuarto bloque: Próxima Cita */}
                  <fieldset className={styles.seguimientoCuartobloque}>
                    <legend>Próxima Cita</legend>
                    <div className={styles.seguimientoControl}>
                      <label>Próx. Cita:</label>
                      <input type="date" id="proximaCita" />
                      <label>- # Citados:</label>
                      <input type="text" id="citados" />
                    </div>
                  </fieldset>
                </div>

                {/* Botones de acción */}
                <div className={styles.seguimientoBotones}>
                  <button type="submit">Guardar</button>
                  <button type="reset">Reset</button>
                  <button type="button">Cancelar</button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <p>No hay datos para mostrar</p>
        )}
      </div>
      <NavPie />
    </div>
  );
};

export default Seguimientonutricional;
