import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./editarpas.css";

const NacimientoPaciente = ({ pacienteId, onClose }) => {
  const [birthData, setBirthData] = useState({
    id_paciente: pacienteId,
    edad_gestacional: "",
    peso: "",
    talla: "",
    perimetro_cefalico: "",
    id_etnia: "",
    id_financiamiento: "",
    codigo_sis: "",
    id_programa: "",
  });

  const [etnias, setEtnias] = useState([]);
  const [financiamientos, setFinanciamientos] = useState([]);
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    fetchData();
    if (pacienteId) {
      fetchNacimientoData();
    }
  }, [pacienteId]);

  const fetchData = async () => {
    try {
      const resFinanciamiento = await fetch(
        "http://localhost:5000/api/financiamientos"
      );
      const financiamientosData = await resFinanciamiento.json();
      console.log("Financiamientos:", financiamientosData);
      setFinanciamientos(financiamientosData);

      const resEtnia = await fetch("http://localhost:5000/api/etnias");
      const etniasData = await resEtnia.json();
      console.log("Etnias:", etniasData);
      setEtnias(etniasData);

      const resPrograma = await fetch("http://localhost:5000/api/programas");
      const programasData = await resPrograma.json();
      console.log("Programas:", programasData);
      setProgramas(programasData);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  const fetchNacimientoData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/nacimiento/${pacienteId}`
      );
      setBirthData(response.data);
    } catch (error) {
      console.error("Error al cargar los datos de nacimiento:", error);
    }
  };

  const handleBirthDataChange = (e) => {
    const { name, value } = e.target;
    setBirthData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBirthDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/nacimiento", birthData);
      console.log("Datos guardados exitosamente", response.data);
      // Aquí puedes agregar lógica adicional después de guardar los datos
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error al guardar los datos");
    }
  };

  return (
    <section className="container-editar-nacimiento section-active">
      <h3>DATOS DE NACIMIENTO</h3>
      <form onSubmit={handleBirthDataSubmit}>
        <div className="datos_cortos">
          <label>
            Edad Gestacional:
            <input
              type="text"
              name="edad_gestacional"
              value={birthData.edad_gestacional}
              onChange={handleBirthDataChange}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab" &&
                  e.key !== "Enter" &&
                  e.key !== "."
                ) {
                  e.preventDefault();
                }
              }}
            />
          </label>
          <label>
            Peso:
            <input
              type="text"
              name="peso"
              value={birthData.peso}
              onChange={handleBirthDataChange}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab" &&
                  e.key !== "Enter" &&
                  e.key !== "."
                ) {
                  e.preventDefault();
                }
              }}
            />
          </label>
          <label>
            Talla:
            <input
              type="text"
              name="talla"
              value={birthData.talla}
              onChange={handleBirthDataChange}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab" &&
                  e.key !== "Enter" &&
                  e.key !== "."
                ) {
                  e.preventDefault();
                }
              }}
            />
          </label>
          <label>
            P. Cefálico:
            <input
              type="text"
              name="perimetro_cefalico"
              value={birthData.perimetro_cefalico}
              onChange={handleBirthDataChange}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Tab" &&
                  e.key !== "Enter" &&
                  e.key !== "."
                ) {
                  e.preventDefault();
                }
              }}
            />
          </label>
        </div>

        <div className="dato-solo">
          <label>
            Etnia:
            <Select
              name="id_etnia"
              value={etnias.find(
                (etnia) => etnia.id_etnia === birthData.id_etnia
              )}
              onChange={(selectedOption) =>
                handleBirthDataChange({
                  target: { name: "id_etnia", value: selectedOption.value },
                })
              }
              options={etnias.map((etnia) => ({
                value: etnia.id_etnia,
                label: etnia.nombre_etnia,
              }))}
              placeholder="Seleccione una etnia"
              isSearchable={true}
            />
          </label>
        </div>

        <div className="datosNaci2">
          <label>
            Financiamiento:
            <Select
              name="id_financiamiento"
              value={financiamientos.find(
                (f) => f.id_financiamiento === birthData.id_financiamiento
              )}
              onChange={(selectedOption) =>
                handleBirthDataChange({
                  target: {
                    name: "id_financiamiento",
                    value: selectedOption.value,
                  },
                })
              }
              options={financiamientos.map((f) => ({
                value: f.id_financiamiento,
                label: f.nombre_financiamiento,
              }))}
              placeholder="Seleccione un financiamiento"
              isSearchable={true}
            />
          </label>
          <label>
            Código SIS:
            <input
              type="text"
              name="codigo_sis"
              value={birthData.codigo_sis}
              onChange={handleBirthDataChange}
            />
          </label>
        </div>
        <div>
          <label className="dato-solo">
            Programa:
            <Select
              name="id_programa"
              value={programas.find(
                (p) => p.id_programa === birthData.id_programa
              )}
              onChange={(selectedOption) =>
                handleBirthDataChange({
                  target: { name: "id_programa", value: selectedOption.value },
                })
              }
              options={programas.map((p) => ({
                value: p.id_programa,
                label: p.nombre_programa,
              }))}
              placeholder="Seleccione un programa"
              isSearchable={true}
            />
          </label>
        </div>

        <div className="box-botones">
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};

export default NacimientoPaciente;
