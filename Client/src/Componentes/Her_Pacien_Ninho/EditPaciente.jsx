import React, { useState, useEffect } from "react";
import "./editarpas.css";
import OpcionesD from "./OpcionesD";
import NavLogin from "../Navegadores/NavLogin";
import NavPie from "../Navegadores/NavPie";
import axios, { formToJSON } from "axios";
import lugares from '../Complementos/lugares.js';
import Select from 'react-select';

import { CgCalendarDates } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";


const EditPaciente = ({ paciente, onCloseEdit }) => {
  const [departamento, setDepartamento] = useState([])//DEPARTAMENTO
  const [provincia, setProvincia] = useState([])
  const [distrito, setDistrito] = useState([])


  const [provinciaResponsable, setProvinciaResponsable] = useState('');
  const [distritoResponsable, setDistritoResponsable] = useState('')
  const [departamentoResponsable, setDepartamentoResponsable] = useState('');


  //estados y codigos para la seleccion de Lugares
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [formData, setFormData] = useState({
    id_res: paciente.id_responsable,
    dni: paciente.dni,
    cnv_linea: paciente.CNV_linea,
    hist_clinico: paciente.hist_clinico,
    nombres: paciente.nombres,
    ape_paterno: paciente.ape_paterno,
    ape_materno: paciente.ape_materno,
    fecha_nacimiento: paciente.fecha_nacimiento,
    edad: paciente.edad,
    sexo: paciente.sexo,
    dni_res: paciente.dni_res,
    tipo_res: paciente.tipo_res,
    nombres_res: paciente.nombres_res,
    ape_paterno_res: paciente.ape_paterno_res,
    ape_materno_res: paciente.ape_materno_res,
    celular1_res: paciente.celular1_res,
    celular2_res: paciente.celular2_res,
    localidad_res: paciente.localidad_res,
    sector_res: paciente.sector_res,
    direccion_res: paciente.direccion_res,
    departamento_res: paciente.departamento_res,
    provincia_res: paciente.provincia_res,
    distrito_res: paciente.distrito_res,



  });
  // ESTADO DEL NACIMIENTO
  const [birthData, setBirthData] = useState({
    edad_gestacional: "",
    id_paciente: paciente.id_paciente,
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

  // HOOK PARA MANEJAR NACIMIENTOS 

  // Función para cargar los datos de la API
  const fetchData = async () => {
    try {
      // Peticiones a la API para obtener los datos
      const programasResponse = await axios.get('/api/programas');
      const financiamientosResponse = await axios.get('/api/financiamientos');
      const etniasResponse = await axios.get('/api/etnias');

      // Actualizar los estados con los datos obtenidos
      setProgramas(programasResponse.data);
      setFinanciamientos(financiamientosResponse.data);
      setEtnias(etniasResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resFinanciamiento = await fetch('http://localhost:5000/api/financiamientos');
        const financiamientosData = await resFinanciamiento.json();
        console.log('Financiamientos:', financiamientosData);
        setFinanciamientos(financiamientosData);

        const resEtnia = await fetch('http://localhost:5000/api/etnias');
        const etniasData = await resEtnia.json();
        console.log('Etnias:', etniasData);
        setEtnias(etniasData);

        const resPrograma = await fetch('http://localhost:5000/api/programas');
        const programasData = await resPrograma.json();
        console.log('Programas:', programasData);
        setProgramas(programasData);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchData();
  }, []);



  // MANEJAR DATOS DEL NACIMIENTO
  const handleBirthDataChange = (e) => {
    const { name, value } = e.target;
    setBirthData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  // ENVIAR DATOS DEL NACIMIENTO
  const handleBirthDataSubmit = async (e) => {
    e.preventDefault();
    // Implement the logic to submit birth data
    try {
      const response = await axios.post("/api/nacimientos", birthData)
      alert("Datos de nacimiento guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los datos de nacimiento:", error);
      alert("Error al guardar los datos de nacimiento");

    }
    console.log("Birth data to submit:", birthData);
    // You'll need to create a new API endpoint to handle birth data separately
    // and implement the axios call here
  }

  // SLECTES DE DEPARTAMENTOS
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedProvince(''); // Reiniciar la provincia seleccionada
    setDepartamento(event.target.value)
    setDepartamentoResponsable(event.target.value)
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setProvincia(event.target.value)
    setProvinciaResponsable(event.target.value)
  };
  const handleDistritoChange = (event) => {
    setDistrito(event.target.value)
    setDistritoResponsable(event.target.value)
  }
  // Filtrar el departamento seleccionado
  const departmentData = lugares.find(dept => dept.departamento === selectedDepartment);
  const provinces = departmentData ? departmentData.provincias : [];
  const selectedProvinceData = provinces.find(prov => prov.nombre === selectedProvince);
  const districts = selectedProvinceData ? selectedProvinceData.distritos : [];




  const [activeSection, setActiveSection] = useState("datos"); // Sección activa por defecto
  const [animateClass, setAnimateClass] = useState(""); // Clase de animación

  // EFECTO PARA CARGAR DATOS
  useEffect(() => {
    // CARGAR LOS DEPARTAMENTOS
    setDepartamento(lugares.map(lugar => lugar.departamento))

    if (formData.departamento_res) {
      const depInfo = lugares.find(lugar => lugar.departamento === formData.departamento_res)

      if (depInfo) {
        setProvincia(depInfo.provincias.map(prov => prov.nombre))

      }
    }

    // Si hay una provincia seleccionada, cargar sus distritos
    if (formData.departamento_res && formData.provincia_res) {
      const depInfo = lugares.find(lugar => lugar.departamento === formData.departamento_res);
      if (depInfo) {
        const provInfo = depInfo.provincias.find(prov => prov.nombre === formData.provincia_res);
        if (provInfo) {
          setDistrito(provInfo.distritos);
        }
      }
    }


  }, [formData.departamento_res, formData.provincia_res])

  useEffect(() => {
    if (paciente) {
      setFormData(prevData => ({
        ...prevData,
        ...paciente,
        fecha_nacimiento: paciente.fecha_nacimiento
          ? new Date(paciente.fecha_nacimiento).toISOString().split("T")[0]
          : "",
        edad: paciente.edad || calculateAge(paciente.fecha_nacimiento),
      }));
    }
  }, [paciente]);

  const onClose = () => {
    setActiveSection("datos"); // O null si quieres ocultarlo
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  // useEffect(() => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     fecha_nacimiento: paciente.fecha_nacimiento
  //       ? new Date(paciente.fecha_nacimiento).toISOString().split("T")[0]
  //       : "", // Asegura que el formato de la fecha sea YYYY-MM-DD
  //     edad: paciente.edad || "",
  //   }));
  // }, [paciente]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => {
  //     const newData = { ...prevData, [name]: value };

  //     if (name === "fecha_nacimiento") {
  //       newData.edad = calculateAge(value);
  //       newData.provincia_res = '';
  //       newData.distrito_res = '';
  //     }

  //     // Resetear distritos si cambia la provincia
  //     if (name === 'provincia_res') {
  //       newData.distrito_res = '';
  //     }
  //     return newData;
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
      console.log(`Campo actualizado - ${name}:`, value);
      return newData;
    });
    setBirthData({ ...birthData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos a enviar:", formData);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/actualizar/paciente/${paciente.id_paciente}`,
        formData
      );

      console.log("Respuesta completa del servidor:", response);

      if (response.status === 200) {
        alert(response.data.message || "Datos actualizados correctamente");
        setFormData(prevData => ({ ...prevData, ...formData }));

        // Actualizar el estado local con los datos enviados
        setFormData(prevData => {
          const newData = { ...prevData, ...formData };
          console.log("Nuevo estado del formulario:", newData);
          return newData;
        });
        window.location.reload();

        // Si tienes una función para actualizar el estado en el componente padre, llámala aquí
        // onUpdatePaciente(formData);
      } else {
        throw new Error("La respuesta del servidor no fue exitosa");
      }
    } catch (error) {
      console.error("Error completo:", error);
      let errorMessage = "Error al actualizar los datos. Por favor, intente nuevamente.";
      if (error.response) {
        console.error("Datos de la respuesta de error:", error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      }
      alert(errorMessage);
    }
  };




  const handleButtonClick = (section) => {
    if (section !== activeSection) {
      setAnimateClass('animate'); // Agrega la clase de animación
      setActiveSection(section); // Cambia la sección activa

      // Elimina la clase de animación después de que termine (0.6s)
      setTimeout(() => {
        setAnimateClass('');
      }, 600); // Tiempo que dura la animación en el CSS
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "nacimiento":
        return (
          <section className={`container-editar-nacimiento ${animateClass} section-active`}>
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
                  />
                </label>
                <label>
                  Peso:
                  <input
                    type="text"
                    name="peso"
                    value={birthData.peso}
                    onChange={handleBirthDataChange}
                  />
                </label>
                <label>
                  Talla:
                  <input
                    type="text"
                    name="talla"
                    value={birthData.talla}
                    onChange={handleBirthDataChange}
                  />
                </label>
                <label>
                  P. Cefálico:
                  <input
                    type="text"
                    name="perimetro_cefalico"
                    value={birthData.perimetro_cefalico}
                    onChange={handleBirthDataChange}
                  />
                </label>
              </div>

              <div className="dato-solo">
              <label>
                Etnia:
                <Select
                  name="id_etnia"
                  value={etnias.find(etnia => etnia.id_etnia === birthData.id_etnia)}
                  onChange={selectedOption => handleBirthDataChange({ target: { name: "id_etnia", value: selectedOption.value } })}
                  options={etnias.map(etnia => ({ value: etnia.id_etnia, label: etnia.nombre_etnia }))}
                  placeholder="Seleccione una etnia"
                  isSearchable={true}  // Habilita la búsqueda
                />
              </label>                
              </div>

             
              <div className="datosNaci2">
                <label>
                  Financiamiento:
                  <Select
                    name="id_financiamiento"
                    value={financiamientos.find(financiamiento => financiamiento.id_financiamiento === birthData.id_financiamiento)}
                    onChange={selectedOption => handleBirthDataChange({ target: { name: "id_financiamiento", value: selectedOption.value } })}
                    options={financiamientos.map(financiamiento => ({ value: financiamiento.id_financiamiento, label: financiamiento.nombre_financiamiento }))}
                    placeholder="Seleccione un financiamiento"
                    isSearchable={true}  // Habilita la búsqueda
                  />
                </label>
                <label>
                  Código SIS:
                  <input
                    type="text"
                    name="codigo_sis"
                    value={birthData.codigo_sis}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
              <label className="dato-solo">
                Programa:
                <Select
                  name="id_programa"
                  value={programas.find(programa => programa.id_programa === birthData.id_programa)}
                  onChange={selectedOption => handleBirthDataChange({ target: { name: "id_programa", value: selectedOption.value } })}
                  options={programas.map(programa => ({ value: programa.id_programa, label: programa.nombre_programa }))}
                  placeholder="Seleccione un programa"
                  isSearchable={true}  // Habilita la búsqueda
                />
              </label>

              </div>
              
              <div className="box-botones">
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={onCloseEdit}>
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        );
      case "responsable":
        return (
          <>
            {paciente.id_responsable && (
              <section
                className={`container-editar-responsable ${animateClass} section-active`}
              >
                <h3>DATOS DEL RESPONSABLE DEL PACIENTE</h3>
                <form onSubmit={handleSubmit}>
                  <div className="cortos_dniTipo">
                    <label>
                      DNI:
                      <input
                        type="text"
                        name="dni_res"
                        value={formData.dni_res}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Tipo Responsable:
                      <select
                        className="select-EditPaciente"
                        name="tipo_res"
                        value={formData.tipo_res}
                        onChange={handleChange}
                      >
                        <option value="Madre">Madre</option>
                        <option value="Padre">Padre</option>
                        <option value="Hijo">Hijo</option>
                        <option value="Otros">Otros</option>
                      </select>
                    </label>
                  </div>
                  <div className="dato-solo">
                  <label>
                      Nombres:
                      <input
                        type="text"
                        name="nombres_res"
                        value={formData.nombres_res}
                        onChange={handleChange}
                      />
                    </label>

                  </div>

                  
                  {/* APELLIDOS */}
                  <div className="cortos_apellidos">                    
                    <label>
                      Paterno:
                      <input
                        type="text"
                        name="ape_paterno_res"
                        value={formData.ape_paterno_res}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Materno:
                      <input
                        type="text"
                        name="ape_materno_res"
                        value={formData.ape_materno_res}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="cortos_celulares">

                    <label>
                      Celular 1:
                      <input
                        type="text"
                        name="celular1_res"
                        value={formData.celular1_res}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Celular 2:
                      <input
                        type="text"
                        name="celular2_res"
                        placeholder="opcional"
                        value={formData.celular2_res}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="cortos_localidadsec">

                    <label>
                      Localidad:
                      <input
                        type="text"
                        name="localidad_res"
                        value={formData.localidad_res}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Sector:
                      <select className="select-EditPaciente"
                        name="sector_res"
                        value={formData.sector_res}
                        onChange={handleChange}
                      >
                        <option value="">Sin Sector</option>
                        <option value="Sector 1">Sector 1</option>
                        <option value="Sector 2">Sector 2</option>
                        <option value="Sector 3">Sector 3</option>
                        <option value="Sector 4">Sector 4</option>
                        <option value="Sector 5">Sector 5</option>
                        <option value="Sector 6">Sector 6</option>
                        <option value="Sector 7">Sector 7</option>
                        <option value="Sector 8">Sector 8</option>
                        <option value="Sector 9">Sector 9</option>
                      </select>
                    </label>
                  </div>

                  <div className="dato-solo">
                  <label>
                    Dirección:
                    <input
                      type="text"
                      name="direccion_res"

                      value={formData.direccion_res}
                      onChange={handleChange}
                    />
                  </label>

                  </div>

                  
                  <div className="datos-departamento">

                    <label>
                      Departamento:
                      <select
                        name="departamento_res"
                        value={formData.departamento_res}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar Departamento</option>
                        {departamento.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Provincia:
                      <select
                        name="provincia_res"
                        value={formData.provincia_res}
                        onChange={handleChange}
                        disabled={!formData.departamento_res}
                      >
                        <option value="">Seleccionar Provincia</option>
                        {provincia.map((prov) => (
                          <option key={prov} value={prov}>{prov}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Distrito:
                      <select
                        name="distrito_res"
                        value={formData.distrito_res}
                        onChange={handleChange}
                        disabled={!formData.provincia_res}
                      >
                        <option value="">Seleccionar Distrito</option>
                        {distrito.map((dist) => (
                          <option key={dist} value={dist}>{dist}</option>
                        ))}
                      </select>
                    </label>

                  </div>

                  <div className="box-botones">

                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={onCloseEdit}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </section>
            )}
          </>
        );
      case "datos":
      default:
        return (
          <section className={`container-editar-paciente ${animateClass} section-active`}>
            <h3>DATOS DEL PACIENTE</h3>
            <form onSubmit={handleSubmit}>
              <div className="datos_cortos">
                <div>
                  <label>
                    DNI:
                    <input
                      type="text"
                      name="dni"
                      value={formData.dni}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Hist Clinico:
                    <input
                      type="text"
                      name="hist_clinico"
                      readOnly
                      value={formData.hist_clinico}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    CNV en Linea:
                    <input
                      type="text"
                      name="cnv_linea"
                      value={formData.cnv_linea}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>

              <div className="dato-solo">
              <label>
                Nombres:
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
              </label>

              </div>              

              <div className="datos-apellidos">
                <label>
                  Apellido Paterno:
                  <input
                    type="text"
                    name="ape_paterno"
                    value={formData.ape_paterno}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Apellido Materno:
                  <input
                    type="text"
                    name="ape_materno"
                    value={formData.ape_materno}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="datos_naci">
                <label>
                  Fecha de Nacimiento:
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Edad:
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    required
                    readOnly
                  />
                </label>

                <label>
                  Sexo:
                  <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    required
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </label>
              </div>
              <div className="box-botones">
                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={onCloseEdit}>
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        );
    }
  };

  return (
    <div className="editar-paciente">
      <OpcionesD pacienteDatos={paciente} />
      <NavLogin />
      <main>
        <section className="opcion-editar">
          <button
            className={activeSection === "datos" ? "active" : ""}
            onClick={() => handleButtonClick("datos")}
          >
            <FaUserEdit className="ico"/>
            DATOS PACIENTE
          </button>
          <button
            className={activeSection === "nacimiento" ? "active" : ""}
            onClick={() => handleButtonClick("nacimiento")}
          ><CgCalendarDates className="ico"/>
            NACIMIENTO
          </button>
          {paciente.id_responsable && (
            <button
              className={activeSection === "responsable" ? "active" : ""}
              onClick={() => handleButtonClick("responsable")}
            >
              <RiParentFill className="ico"/>
              RESPONSABLE
            </button>
          )}
        </section>
        {renderSection()}
      </main>
      <NavPie />
    </div>
  );
};

export default EditPaciente;