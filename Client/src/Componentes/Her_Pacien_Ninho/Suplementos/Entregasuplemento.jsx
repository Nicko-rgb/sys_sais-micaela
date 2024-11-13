import React, { useState, useEffect } from "react";
import style from "./Entregasuplemento.module.css";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";
import Listasuplemento from "./Listasuplemento"; // Importar Listasuplemento

function Entregasuplemento() {
  const location = useLocation();
  const { paciente } = location.state || {};

  // Estado para almacenar los suplementos entregados
  const [suplementosEntregados, setSuplementosEntregados] = useState([]);

  // Al cargar el componente, recuperar los suplementos entregados de localStorage
  useEffect(() => {
    const storedSuplementos = localStorage.getItem("suplementosEntregados");
    if (storedSuplementos) {
      setSuplementosEntregados(JSON.parse(storedSuplementos));
    }
  }, []);

  // Función para registrar un suplemento entregado
  const entregasuplemento = (
    suplemento,
    cantidad,
    fechaAtencion,
    presentacion
  ) => {
    if (cantidad > 0) {
      const suplementoEntregado = {
        suplemento,
        cantidad,
        fechaAtencion,
        presentacion,
      };

      const updatedSuplementos = [
        ...suplementosEntregados,
        suplementoEntregado,
      ];
      setSuplementosEntregados(updatedSuplementos);
      localStorage.setItem(
        "suplementosEntregados",
        JSON.stringify(updatedSuplementos)
      );

      alert(`Suplemento ${suplemento} entregado!`);
    } else {
      alert("Por favor, ingrese una cantidad válida.");
    }
  };

  // Función para editar un suplemento
  const editarSuplemento = (index, cantidad, presentacion) => {
    const updatedSuplementos = [...suplementosEntregados];
    updatedSuplementos[index].cantidad = cantidad;
    updatedSuplementos[index].presentacion = presentacion;
    setSuplementosEntregados(updatedSuplementos);
    localStorage.setItem(
      "suplementosEntregados",
      JSON.stringify(updatedSuplementos)
    );
  };

  // Función para eliminar un suplemento
  const eliminarSuplemento = (index) => {
    const updatedSuplementos = suplementosEntregados.filter(
      (_, i) => i !== index
    );
    setSuplementosEntregados(updatedSuplementos);
    localStorage.setItem(
      "suplementosEntregados",
      JSON.stringify(updatedSuplementos)
    );
  };

  return (
    <div>
      {paciente ? (
        <>
          <div>
            <Link
              to={`/panel/${paciente.hist_clinico}`}
              className={style.volverbtn}
            >
              <RiPlayReverseLargeFill /> VOLVER
            </Link>
          </div>

          <div className={style.container}>
            {/* Suplemento VITAMINA A */}
            <div className={style.card}>
              <h2>VITAMINA A</h2>
              <form>
                <div className={style.row}>
                  <label>N° de entrega:</label>
                  <input type="number" defaultValue="1" disabled />
                  <label>Fec. Atención:</label>
                  <input type="date" defaultValue="2024-11-11" id="fechaA" />
                </div>
                <div className={style.row}>
                  <label>Cantidad:</label>
                  <input type="number" id="cantidadA" />
                  <label>Presentación:</label>
                  <select id="presentacionA">
                    <option value="VA">VA</option>
                  </select>
                </div>
                <button
                  type="button"
                  className={style.entregarbtn}
                  onClick={() => {
                    const cantidad = document.getElementById("cantidadA").value;
                    const fechaAtencion =
                      document.getElementById("fechaA").value;
                    const presentacion =
                      document.getElementById("presentacionA").value;
                    entregasuplemento(
                      "VITAMINA A",
                      cantidad,
                      fechaAtencion,
                      presentacion
                    );
                  }}
                >
                  Entregar
                </button>
              </form>
            </div>

            {/* Suplemento Zinc */}
            <div className={style.card}>
              <h2>Zinc</h2>
              <form>
                <div className={style.row}>
                  <label>N° de entrega:</label>
                  <input type="number" defaultValue="1" disabled />
                  <label>Fec. Atención:</label>
                  <input type="date" defaultValue="2024-11-11" id="fechaZ" />
                </div>
                <div className={style.row}>
                  <label>Cantidad:</label>
                  <input type="number" id="cantidadZ" />
                  <label>Presentación:</label>
                  <select id="presentacionZ">
                    <option value="ZN">ZN</option>
                  </select>
                </div>
                <button
                  type="button"
                  className={style.entregarbtn}
                  onClick={() => {
                    const cantidad = document.getElementById("cantidadZ").value;
                    const fechaAtencion =
                      document.getElementById("fechaZ").value;
                    const presentacion =
                      document.getElementById("presentacionZ").value;
                    entregasuplemento(
                      "Zinc",
                      cantidad,
                      fechaAtencion,
                      presentacion
                    );
                  }}
                >
                  Entregar
                </button>
              </form>
            </div>

            {/* Suplemento Antiparasitario */}
            <div className={style.card}>
              <h2>Antiparasitario</h2>
              <form>
                <div className={style.row}>
                  <label>N° de entrega:</label>
                  <input type="number" defaultValue="1" disabled />
                  <label>Fec. Atención:</label>
                  <input type="date" defaultValue="2024-11-11" id="fechaAP" />
                </div>
                <div className={style.row}>
                  <label>Cantidad:</label>
                  <input type="number" id="cantidadAP" />
                  <label>Presentación:</label>
                  <select id="presentacionAP">
                    <option value="MZ">MZ</option>
                  </select>
                </div>
                <button
                  type="button"
                  className={style.entregarbtn}
                  onClick={() => {
                    const cantidad =
                      document.getElementById("cantidadAP").value;
                    const fechaAtencion =
                      document.getElementById("fechaAP").value;
                    const presentacion =
                      document.getElementById("presentacionAP").value;
                    entregasuplemento(
                      "Antiparasitario",
                      cantidad,
                      fechaAtencion,
                      presentacion
                    );
                  }}
                >
                  Entregar
                </button>
              </form>
            </div>
            {/* Suplemento 24m-35m */}
            <div className={style.card}>
              <h2>Suplemento 24m-35m </h2>
              <form>
                <div className={style.row}>
                  <label>N° de entrega:</label>
                  <input type="number" defaultValue="1" disabled />
                  <label>Fec. Atención:</label>
                  <input type="date" defaultValue="2024-11-11" id="fechaAP" />
                </div>
                <div className={style.row}>
                  <label>Cantidad:</label>
                  <input type="number" id="cantidadAP" />
                  <label>Presentación:</label>
                  <select id="presentacionAP">
                    <option value="MN">MN</option>
                    <option value="HP">HP</option>
                    <option value="SF">SF</option>
                    <option value="TA">TA</option>
                  </select>
                </div>
                <button
                  type="button"
                  className={style.entregarbtn}
                  onClick={() => {
                    const cantidad =
                      document.getElementById("cantidadAP").value;
                    const fechaAtencion =
                      document.getElementById("fechaAP").value;
                    const presentacion =
                      document.getElementById("presentacionAP").value;
                    entregasuplemento(
                      "Antiparasitario",
                      cantidad,
                      fechaAtencion,
                      presentacion
                    );
                  }}
                >
                  Entregar
                </button>
              </form>
            </div>
          </div>

          {/* Aquí pasa los suplementos entregados al componente Listasuplemento */}
          <Listasuplemento
            suplementos={suplementosEntregados}
            editarSuplemento={editarSuplemento}
            eliminarSuplemento={eliminarSuplemento}
          />
        </>
      ) : (
        <p>No hay datos ...</p>
      )}
    </div>
  );
}

export default Entregasuplemento;
