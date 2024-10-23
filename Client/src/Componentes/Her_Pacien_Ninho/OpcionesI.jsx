import React from "react";
import "./opciones.css";
import { MdOutlineAppRegistration } from "react-icons/md";
import { PiNotePencil } from "react-icons/pi";
import { TbMedicineSyrup } from "react-icons/tb";
import { MdOutlineBloodtype, MdOutlineVaccines } from "react-icons/md";
import { IoBody } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const OpcionesI = () => {
  const navigate = useNavigate(); // Hook de navegación

  const handleNewVisitClick = () => {
    navigate("/visita"); // Redirige a la ruta de "Nueva Visita"
  };
  const iraHistorialVisita = () => {
    navigate("/historialvisita"); // Redirige a la ruta de "historialVisita"
  };
  const seguimientoNutricional = () => {
    navigate("/seguimiento"); // Redirige a la ruta de "historialVisita"
  };

  const actualizarControles = () => {
    navigate("/actualizarcontroles"); // Redirige a la ruta de "Actualizar controles"
  };

  const iraControl = () => {
    navigate("/control"); // Redirige a la
  };
  return (
    <section className="opciones-right">
      <div className="cabeza">
        <p>Menú de Opciones</p>
      </div>
      <div className="opciones4">
        {/* <details name='opcion' className="opcion-item">
          <summary><MdOutlineAppRegistration className='icon' />DATOS</summary>
          <p>GENERAL</p>
          <p>TARJETA DE CONTROL</p>
          <p>EDITAR DATOS</p>
        </details> */}
        <details name="opcion" className="opcion-item">
          <summary>
            <PiNotePencil className="icon" />
            CONTROL
          </summary>
          <div className="submenu-control-nino">
          <button onClick={iraControl} className="control-nino">
            CONTROL NIÑO
          </button>
          </div>
          <div className="submenu-control-nino">
            <button onClick={seguimientoNutricional}>
              SEGUIMIENTO NUTRICIONAL
            </button>
          </div>
          <p className="historial-controles">HIST DE CONTROLES</p>
          <div className="submenu-historial-controles">
            <button onClick={actualizarControles}>
            ACTUALIZAR CONTROLES
            </button>
          </div>
          <button className="p" onClick={handleNewVisitClick}>
            VISITA DOMICILIARIA
          </button>
          <button onClick={iraHistorialVisita}>HIST DE VISITA</button>
        </details>

        <details name="opcion" className="opcion-item">
          <summary>
            <TbMedicineSyrup className="icon" />
            SUPLEMENTOS
          </summary>

          <p>Entrega Suplemento</p>
          <p> Historial Suplemento</p>
          <p>Actualizar Suplementos</p>
        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            <MdOutlineBloodtype className="icon" />
            TAMISAJE
          </summary>
          <p>Tamizaje-Dozaje</p>
          <p> Historial Tamizaje</p>
        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            {" "}
            <IoBody className="icon" />
            PSICOMOTOR
          </summary>
          <p>Evaluacion Psicomotor</p>
          <p> Historial Psicomotor</p>
        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            <MdOutlineVaccines className="icon" />
            VACUNA
          </summary>
          <p>Vacunar Niño</p>
          <p> Historial Vacunas</p>
          <p> Vacunas Faltantes</p>
        </details>
      </div>
    </section>
  );
};

export default OpcionesI;