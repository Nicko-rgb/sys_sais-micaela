import React from "react";
import "./opciones.css";
import { PiNotePencil } from "react-icons/pi";
import { TbMedicineSyrup } from "react-icons/tb";
import { MdOutlineBloodtype, MdOutlineVaccines } from "react-icons/md";
import { IoBody } from "react-icons/io5";
import { useNavigate } from "react-router-dom"

const OpcionesI = ({ paciente }) => {
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

  const irAControl = () => {
    navigate(`/control/${paciente.hist_clinico}`, { state: { paciente } });
  };

  const IraTamizaje = () => {
    navigate(`/tamizaje/${paciente.hist_clinico}`, { state: { paciente } });
  }

  return (
    <section className="opciones-right">
      <div className="cabeza">
        <p>Menú de Opciones</p>
      </div>
      <div className="opciones4">
        {/* <details name='opcion' className="opcion-item">
          <summary><MdOutlineAppRegistration className='icon' />DATOS</summary>
          <button>GENERAL</button>
          <button>TARJETA DE CONTROL</button>
          <button>EDITAR DATOS</button> 
        </details> */}
        <details name="opcion" className="opcion-item">
          <summary>
            <PiNotePencil className="icon" />
            CONTROL
          </summary>
          <div className="submenu-control-nino">
            <button onClick={irAControl} className="control-nino">
              CONTROL NIÑO
            </button>
          </div>
          <div className="submenu-control-nino">
            <button onClick={seguimientoNutricional}>
              SEGUIMIENTO NUTRICIONAL
            </button>
          </div>
          <div className="submenu-historial-controles">
            <button onClick="">
              HIST DE CONTROLES
            </button>
          </div>
          <div className="submenu-historial-controles">
            <button onClick={actualizarControles}>
              ACTUALIZAR CONTROLES
            </button>
          </div>
          <button className="button" onClick={handleNewVisitClick}>VISITA DOMICILIARIA</button>
          <button onClick={iraHistorialVisita}>HIST DE VISITA</button>
        </details>

        <details name="opcion" className="opcion-item">
          <summary>
            <TbMedicineSyrup className="icon" />
            SUPLEMENTOS
          </summary>
          <button>Entrega Suplemento</button>
          <button> Historial Suplemento</button>
          <button>Actualizar Suplementos</button>
        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            <MdOutlineBloodtype className="icon" />
            TAMIZAJE
          </summary>
          <button onClick={IraTamizaje}>Tamizaje-Dozaje</button>
          <button> Historial Tamizaje</button>
        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            {" "}
            <IoBody className="icon" />
            PSICOMOTOR
          </summary>
          <button>Evaluacion Psicomotor</button>
          <button> Historial Psicomotor</button>
        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            <MdOutlineVaccines className="icon" />
            VACUNA
          </summary>
          <button>Vacunar Niño</button>
          <button> Historial Vacunas</button>
          <button> Vacunas Faltantes</button>
        </details>
      </div>
    </section>
  );
};

export default OpcionesI;