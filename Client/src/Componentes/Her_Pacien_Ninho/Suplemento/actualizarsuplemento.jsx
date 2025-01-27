import React from "react";
import style from "./actualizarsuplemento.module.css";
import NavLogin from "../../Navegadores/NavLogin";
import NavPie from "../../Navegadores/NavPie";
import { Link, useNavigate } from "react-router-dom";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import Entregasuplemento from "./Entregasuplemento";
import Listasumplemento from "./Listasumplemento";

const Actualizarsuplementos = ({ paciente, cambiarVista }) => {
  const navigate = useNavigate(); // Hook para navegación

  const data = [
    { rangoEdad: "Suplemento 1m-5m", tipo: "MES", max: 5 },
    { rangoEdad: "Suplemento 6m-23m", tipo: "MES", max: 6 },
    { rangoEdad: "VITAMINA A", tipo: "MES", max: 9 },
    { rangoEdad: "Sulfato Ferroso", tipo: "MES", max: 4 },
    { rangoEdad: "Zinc", tipo: "MES", max: 10 },
    { rangoEdad: "Antiparasitario", tipo: "MES", max: 6 },
    { rangoEdad: "Suplemento 24m-35m", tipo: "MES", max: 6 },
    { rangoEdad: "Suplemento 36m-59m", tipo: "MES", max: 6 },
  ];

  return (
    <div>
      <NavLogin />
      <div className={style.suplementoscontainer}>
        {paciente ? (
          <>
            <h3>Actualizar Suplementos Niño</h3>

            {/* Dropdown en la esquina superior derecha */}
            <div className={style.dropdown}>
              <button className={style.dropdownbutton}>⚙</button>
              <div className={style.dropdownmenu}>
                <button
                  onClick={() =>
                    cambiarVista(<Entregasuplemento paciente={paciente} />)
                  }
                >
                  Entregar Suplemento
                </button>
                <button
                  onClick={() =>
                    cambiarVista(<Listasumplemento paciente={paciente} />)
                  }
                >
                  Listar Suplementos
                </button>
              </div>
            </div>
            {/* Tabla de suplementos */}
            <table className={style.suplementostable}>
              <thead>
                <tr>
                  <th>Rango Edad</th>
                  <th>Tipo</th>
                  <th>Max</th>
                  <th># Controles</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.rangoEdad}</td>
                    <td>{item.tipo}</td>
                    <td>{item.max}</td>
                    <td>
                      <input type="text" className={style.inputcontrol} />
                    </td>
                    <td>
                      <button className={style.checkbutton}>✔</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No hay datos..</p>
        )}
      </div>
      <NavPie />
    </div>
  );
};

export default Actualizarsuplementos;
