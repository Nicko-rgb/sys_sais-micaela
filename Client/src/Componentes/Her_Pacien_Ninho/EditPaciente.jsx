import React, { useState, useEffect } from "react";
import "./editarpas.css";
import NavLogin from "../Navegadores/NavLogin";
import NavPie from "../Navegadores/NavPie";
import axios, { formToJSON } from "axios";
import lugares from "../Complementos/lugares.js";
import NacimientoPaciente from "./nacimientopaciente";
import ResponsablePaciente from "./responsablepaciente";
import { CgCalendarDates } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import DatosNino from "../PanelPaciente/Ninho/DatosNino.jsx";

const EditPaciente = ({ paciente, onCloseEdit}) => {

    const [departamento, setDepartamento] = useState([]); //DEPARTAMENTO
    const [provincia, setProvincia] = useState([]);
    const [distrito, setDistrito] = useState([]);

    const [provinciaResponsable, setProvinciaResponsable] = useState("");
    const [distritoResponsable, setDistritoResponsable] = useState("");
    const [departamentoResponsable, setDepartamentoResponsable] = useState("");

    //estados y codigos para la seleccion de Lugares
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [formData, setFormData] = useState({
        id_paciente: paciente.id_paciente,
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
    // ACCION PARA CALCULAR LA EDAD EN TIEMPO REAL 
    const calcularEdad = (fechanacimiento => {
        const hoy = new Date();
        const nacimiento = new Date(fechanacimiento)
        let edad = hoy.getFullYear() - nacimiento.getFullYear()
        const mes = hoy.getMonth() - nacimiento.getMonth()

        // Ajuste en caso de que el cumpleaños aún no haya ocurrido este año
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad


    })

    // SLECTES DE DEPARTAMENTOS
    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
        setSelectedProvince(""); // Reiniciar la provincia seleccionada
        setDepartamento(event.target.value);
        setDepartamentoResponsable(event.target.value);
    };

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
        setProvincia(event.target.value);
        setProvinciaResponsable(event.target.value);
    };
    const handleDistritoChange = (event) => {
        setDistrito(event.target.value);
        setDistritoResponsable(event.target.value);
    };
    // Filtrar el departamento seleccionado
    const departmentData = lugares.find(
        (dept) => dept.departamento === selectedDepartment
    );
    const provinces = departmentData ? departmentData.provincias : [];
    const selectedProvinceData = provinces.find(
        (prov) => prov.nombre === selectedProvince
    );
    const districts = selectedProvinceData ? selectedProvinceData.distritos : [];

    const [activeSection, setActiveSection] = useState("datos");
    const [animateClass, setAnimateClass] = useState(""); 

    // EFECTO PARA CARGAR DATOS
    useEffect(() => {
        // CARGAR LOS DEPARTAMENTOS
        setDepartamento(lugares.map((lugar) => lugar.departamento));

        if (formData.departamento_res) {
            const depInfo = lugares.find(
                (lugar) => lugar.departamento === formData.departamento_res
            );

            if (depInfo) {
                setProvincia(depInfo.provincias.map((prov) => prov.nombre));
            }
        }

        // Si hay una provincia seleccionada, cargar sus distritos
        if (formData.departamento_res && formData.provincia_res) {
            const depInfo = lugares.find(
                (lugar) => lugar.departamento === formData.departamento_res
            );
            if (depInfo) {
                const provInfo = depInfo.provincias.find(
                    (prov) => prov.nombre === formData.provincia_res
                );
                if (provInfo) {
                    setDistrito(provInfo.distritos);
                }
            }
        }
    }, [formData.departamento_res, formData.provincia_res]);

    useEffect(() => {
        if (paciente) {
            setFormData((prevData) => ({
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        // Actualiza el valor de fecha de nacimiento y calcula la edad
        if (name === 'fecha_nacimiento') {
            const edadCalculada = calcularEdad(value);
            setFormData({
                ...formData,
                fecha_nacimiento: value,
                edad: edadCalculada >= 0 ? edadCalculada : '',
            });
        }
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };
            console.log(`Campo actualizado - ${name}:`, value);
            return newData;
        });
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
                setFormData((prevData) => ({ ...prevData, ...formData }));

                // Actualizar el estado local con los datos enviados
                setFormData((prevData) => {
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
            let errorMessage =
                "Error al actualizar los datos. Por favor, intente nuevamente.";
            if (error.response) {
                console.error("Datos de la respuesta de error:", error.response.data);
                errorMessage = error.response.data.message || errorMessage;
            }
            alert(errorMessage);
        }
    };

    const handleButtonClick = (section) => {
        if (section !== activeSection) {
            setAnimateClass("animate"); // Agrega la clase de animación
            setActiveSection(section); // Cambia la sección activa

            // Elimina la clase de animación después de que termine (0.6s)
            setTimeout(() => {
                setAnimateClass("");
            }, 600); // Tiempo que dura la animación en el CSS
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case "nacimiento":
                return (
                    <NacimientoPaciente
                        pacienteId={paciente.id_paciente}
                        pacienteDni={paciente.dni}
                        onClose={onCloseEdit}
                        
                    />
                );
            case "responsable":
                return paciente.id_responsable ? (
                    <ResponsablePaciente paciente={paciente} onCloseEdit={onCloseEdit} />
                ) : null;
            case "datos":
            default:
                return (
                    <section
                        className={`container-editar-paciente ${animateClass} section-active`}
                    >
                        <h3>DATOS DEL PACIENTE</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="datos-cortos">
                                <label>
                                    DNI:
                                    <input
                                        type="text"
                                        name="dni"
                                        value={formData.dni}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            if (
                                                !/^\d$/.test(e.key) &&
                                                e.key !== "Backspace" &&
                                                e.key !== "Tab" &&
                                                e.key !== "Enter"
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                        maxLength={8}
                                        required
                                    />
                                </label>

                                <label>
                                    Hist Clinico:
                                    <input
                                        type="text"
                                        name="hist_clinico"
                                        readOnly
                                        value={formData.hist_clinico}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            // Permitir teclas especiales como Backspace, Tab, etc.
                                            if (
                                                !/^\d$/.test(e.key) && // Solo permitir dígitos
                                                e.key !== "Backspace" && // Permitir Backspace
                                                e.key !== "Tab" && // Permitir Tab
                                                e.key !== "Enter" // Permitir Enter
                                            ) {
                                                e.preventDefault(); // Evita la escritura de caracteres no permitidos
                                            }
                                        }}
                                        maxLength={8} // Limitar a 8 caracteres
                                    />
                                </label>
                                <label>
                                    CNV en Linea:
                                    <input
                                        type="text"
                                        name="cnv_linea"
                                        value={formData.cnv_linea}
                                        onChange={handleChange}
                                        onKeyDown={(e) => {
                                            // Permitir teclas especiales como Backspace, Tab, etc.
                                            if (
                                                !/^\d$/.test(e.key) && // Solo permitir dígitos
                                                e.key !== "Backspace" && // Permitir Backspace
                                                e.key !== "Tab" && // Permitir Tab
                                                e.key !== "Enter" // Permitir Enter
                                            ) {
                                                e.preventDefault(); // Evita la escritura de caracteres no permitidos
                                            }
                                        }}
                                        maxLength={8} // Limitar a 8 caracteres
                                    />
                                </label>
                            </div>

                            <label>
                                Nombres:
                                <input
                                    type="text"
                                    name="nombres"
                                    value={formData.nombres}
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: "nombres",
                                                value: e.target.value.toUpperCase(),
                                            },
                                        })
                                    }
                                    onKeyDown={(e) => {
                                        // Permitir teclas especiales como Backspace, Tab, etc.
                                        if (
                                            !/^[A-Za-zÀ-ÿ\s]$/.test(e.key) && // Solo letras y espacios
                                            e.key !== "Backspace" && // Permitir Backspace
                                            e.key !== "Tab" && // Permitir Tab
                                            e.key !== "Enter" // Permitir Enter
                                        ) {
                                            e.preventDefault(); // Evita la escritura de caracteres no permitidos
                                        }
                                    }}
                                    required
                                />
                            </label>

                            <div className="datos-cortos">
                                <label>
                                    Apellido Paterno:
                                    <input
                                        type="text"
                                        name="ape_paterno"
                                        value={formData.ape_paterno}
                                        onChange={(e) =>
                                            handleChange({
                                                target: {
                                                    name: "ape_paterno",
                                                    value: e.target.value.toUpperCase(),
                                                },
                                            })
                                        }
                                        onKeyDown={(e) => {
                                            // Permitir teclas especiales como Backspace, Tab, etc.
                                            if (
                                                !/^[A-Za-zÀ-ÿ\s]$/.test(e.key) && // Solo letras y espacios
                                                e.key !== "Backspace" && // Permitir Backspace
                                                e.key !== "Tab" && // Permitir Tab
                                                e.key !== "Enter" // Permitir Enter
                                            ) {
                                                e.preventDefault(); // Evita la escritura de caracteres no permitidos
                                            }
                                        }}
                                        required
                                    />
                                </label>
                                <label>
                                    Apellido Materno:
                                    <input
                                        type="text"
                                        name="ape_materno"
                                        value={formData.ape_materno}
                                        onChange={(e) =>
                                            handleChange({
                                                target: {
                                                    name: "ape_materno",
                                                    value: e.target.value.toUpperCase(),
                                                },
                                            })
                                        }
                                        onKeyDown={(e) => {
                                            // Permitir teclas especiales como Backspace, Tab, etc.
                                            if (
                                                !/^[A-Za-zÀ-ÿ\s]$/.test(e.key) && // Solo letras y espacios
                                                e.key !== "Backspace" && // Permitir Backspace
                                                e.key !== "Tab" && // Permitir Tab
                                                e.key !== "Enter" // Permitir Enter
                                            ) {
                                                e.preventDefault(); // Evita la escritura de caracteres no permitidos
                                            }
                                        }}
                                        required
                                    />
                                </label>
                            </div>
                            <div className="datos-cortos">
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
                                <button className="save" type="submit">Guardar Cambios</button>
                                <button className="cancel" type="button" onClick={onCloseEdit}>
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
            <NavLogin />
            <main>
                <section className="opcion-editar">
                    <button
                        className={activeSection === "datos" ? "active" : ""}
                        onClick={() => handleButtonClick("datos")}
                    >
                        <FaUserEdit className="ico" />
                        DATOS PACIENTE
                    </button>
                    <button
                        className={activeSection === "nacimiento" ? "active" : ""}
                        onClick={() => handleButtonClick("nacimiento")}
                    >
                        <CgCalendarDates className="ico" />
                        NACIMIENTO
                    </button>
                    {paciente.id_responsable && (
                        <button
                            className={activeSection === "responsable" ? "active" : ""}
                            onClick={() => handleButtonClick("responsable")}
                        >
                            <RiParentFill className="ico" />
                            RESPONSABLE
                        </button>
                    )}
                </section>
                {renderSection()}
            </main>
            <NavPie/>
        </div>
    );
};

export default EditPaciente;