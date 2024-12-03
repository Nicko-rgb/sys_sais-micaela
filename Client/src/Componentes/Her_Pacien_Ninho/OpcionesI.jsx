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
  }
  const Actualizarsuplemento = () => {
    navigate(`/Actualizarsuplemento/${paciente.hist_clinico}`, { state: { paciente } });
  };

  const EvaluacionPsicomotor = () => {
    navigate(`/EvaluacionPsicomotor/${paciente.hist_clinico}`, { state: { paciente } });
  }
  const HisotiriaPsicomotor = ()=> {
    navigate(`/HistorialPsicomotor/${paciente.hist_clinico}`, { state: { paciente } });
  }

  const IraTamizaje = () => {
    navigate(`/tamizaje/${paciente.hist_clinico}`, { state: { paciente } });
  }

  const iraHistorialTamizaje = () => {
    navigate(`/historialtamizaje/${paciente.hist_clinico}`, { state: { paciente } });
  }

  const EntregaSuplementos = () => {
    navigate(`/Entregasuplementos/${paciente.hist_clinico}`, { state: { paciente } }); // Redirige a la ruta entregar suplementos
  }
  const ListaSuplemento = () => {
    navigate(`/Listasuplementos/${paciente.hist_clinico}`, { state: { paciente } }); // Redirige a la ruta entregar listasuplemento
  }
  const VacunarNino = () => {
    navigate(`/VacunarNino/${paciente.hist_clinico}`, { state: { paciente } }); // Redirige a la ruta entregar listasuplemento
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
            <button >
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
          <button onClick={EntregaSuplementos}>Entrega Suplemento</button>
          <button onClick={ListaSuplemento}> Historial Suplemento</button>
          <button onClick={Actualizarsuplemento}>Actualizar Suplementos</button>

        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            <MdOutlineBloodtype className="icon" />
            TAMIZAJE
          </summary>
          <button onClick={IraTamizaje}>Tamizaje-Dozaje</button>
          <button onClick={iraHistorialTamizaje}> Historial Tamizaje</button>
        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            {" "}
            <IoBody className="icon" />
            PSICOMOTOR
          </summary>
          <button onClick={EvaluacionPsicomotor}>Evaluacion Psicomotor</button>
          <button onClick={HisotiriaPsicomotor} > Historial Psicomotor</button>
        </details>
        <details name="opcion" className="opcion-item">
          <summary>
            <MdOutlineVaccines className="icon" />
            VACUNA
          </summary>
          <button onClick={VacunarNino}>Vacunar Niño</button>
          <button> Historial Vacunas</button>
          <button> Vacunas Faltantes</button>
        </details>
      </div>
    </section>
  );
};

export default OpcionesI;