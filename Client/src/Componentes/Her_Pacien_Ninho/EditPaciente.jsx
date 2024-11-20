import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { RiParentFill } from "react-icons/ri";
import OpcionesD from "./OpcionesD";
import NavLogin from "../Navegadores/NavLogin";
import NavPie from "../Navegadores/NavPie";
import NacimientoPaciente from "../Her_Pacien_Ninho/nacimientopaciente";
import ResponsablePaciente from "../Her_Pacien_Ninho/responsablepaciente";

const EditPaciente = ({ paciente, onCloseEdit }) => {
    // Estado y Hooks
    const [activeSection, setActiveSection] = useState("datos");
    const [animateClass, setAnimateClass] = useState("");
    const [formData, setFormData] = useState({
        dni: paciente?.dni || "",
        hist_clinico: paciente?.hist_clinico || "",
        cnv_linea: paciente?.cnv_linea || "",
        nombres: paciente?.nombres || "",
        ape_paterno: paciente?.ape_paterno || "",
        ape_materno: paciente?.ape_materno || "",
        fecha_nacimiento: paciente?.fecha_nacimiento || "",
        edad: paciente?.edad || "",
        sexo: paciente?.sexo || "",
    });

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/pacientes/${paciente.id_paciente}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                const data = await response.json();
                alert(data.message || "Datos actualizados correctamente");
                onCloseEdit(); // Cierra el modal o componente de edición
            } else {
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Error al actualizar los datos. Por favor, intente nuevamente.";
            console.error("Error completo:", error);
            alert(errorMessage);
        }
    };

    // Función para manejar el cambio de secciones
    const handleButtonClick = (section) => {
        if (section !== activeSection) {
            setAnimateClass("animate");
            setActiveSection(section);
            setTimeout(() => setAnimateClass(""), 600); // Limpia la animación
        }
    };

    // Renderizado de secciones
    const renderSection = () => {
        switch (activeSection) {
            case "nacimiento":
                return (
                    <NacimientoPaciente
                        pacienteId={paciente.id_paciente}
                        paciente={paciente}
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
                                        value={formData.hist_clinico}
                                        readOnly
                                        maxLength={8}
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
                                            target: { name: "nombres", value: e.target.value.toUpperCase() },
                                        })
                                    }
                                    onKeyDown={(e) => {
                                        if (
                                            !/^[A-Za-zÀ-ÿ\s]$/.test(e.key) &&
                                            e.key !== "Backspace" &&
                                            e.key !== "Tab" &&
                                            e.key !== "Enter"
                                        ) {
                                            e.preventDefault();
                                        }
                                    }}
                                    required
                                />
                            </label>

                            <div className="box-botones">
                                <button className="save" type="submit">
                                    Guardar Cambios
                                </button>
                                <button className="cancel" type="button" onClick={onCloseEdit}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </section>
                );
        }
    };

    // Render principal
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
            <NavPie />
        </div>
    );
};

export default EditPaciente;
