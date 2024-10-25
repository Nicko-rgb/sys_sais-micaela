import React, { useState, useEffect } from "react";
import axios from "axios";
import lugares from "../Complementos/lugares.js";
import "./editarpas.css";

const ResponsablePaciente = ({ paciente, onCloseEdit }) => {
    const [formData, setFormData] = useState({
        id_paciente: paciente.id_paciente,
        id_responsable: paciente.id_responsable, // Asegúrate de que sea id_responsable
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

    const [departamento, setDepartamento] = useState([]);
    const [provincia, setProvincia] = useState([]);
    const [distrito, setDistrito] = useState([]);

    useEffect(() => {
        setDepartamento(lugares.map((lugar) => lugar.departamento));

        if (formData.departamento_res) {
            const depInfo = lugares.find(
                (lugar) => lugar.departamento === formData.departamento_res
            );
            if (depInfo) {
                setProvincia(depInfo.provincias.map((prov) => prov.nombre));
            }
        }

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Datos a enviar:", formData);

        try {
            // Actualizar el responsable usando su ID
            const response = await axios.put(
                `http://localhost:5000/api/actualizar/responsable/${formData.id_responsable}`,
                formData // Envío de datos para el responsable
            );

            console.log("Respuesta completa del servidor:", response);

            if (response.status === 200) {
                alert(response.data.message || "Datos actualizados correctamente");
                // Limpiar el estado después de la actualización
                setFormData({
                    id_paciente: paciente.id_paciente,
                    id_responsable: paciente.id_responsable,
                    dni_res: "",
                    tipo_res: "",
                    nombres_res: "",
                    ape_paterno_res: "",
                    ape_materno_res: "",
                    celular1_res: "",
                    celular2_res: "",
                    localidad_res: "",
                    sector_res: "",
                    direccion_res: "",
                    departamento_res: "",
                    provincia_res: "",
                    distrito_res: "",
                });
                window.location.reload(); // Recargar la página o actualizar el estado del componente padre
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

    return (
        <section className="container-editar-responsable section-active">
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
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "nombres_res",
                                        value: e.target.value.toUpperCase(),
                                    },
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
                </div>
                <div className="cortos_apellidos">
                    <label>
                        Paterno:
                        <input
                            type="text"
                            name="ape_paterno_res"
                            value={formData.ape_paterno_res}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "ape_paterno_res",
                                        value: e.target.value.toUpperCase(),
                                    },
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
                    <label>
                        Materno:
                        <input
                            type="text"
                            name="ape_materno_res"
                            value={formData.ape_materno_res}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: "ape_materno_res",
                                        value: e.target.value.toUpperCase(),
                                    },
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
                </div>
                <div className="cortos_celulares">
                    <label>
                        Celular 1:
                        <input
                            type="text"
                            name="celular1_res"
                            value={formData.celular1_res}
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
                            maxLength={9}
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
                            maxLength={9}
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
                        <select
                            className="select-EditPaciente"
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
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
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
                                <option key={prov} value={prov}>
                                    {prov}
                                </option>
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
                                <option key={dist} value={dist}>
                                    {dist}
                                </option>
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
    );
};

export default ResponsablePaciente;