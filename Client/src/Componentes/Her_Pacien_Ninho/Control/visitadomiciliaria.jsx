import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./estilosGeneralControl.css";
import ModalExito from "../ModalExito/ModalExito";

const VisitaDomiciliaria = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        tipo: "",
        numero_visita: "",
        fecha_atencion: "",
        opcional: "",
        observaciones: "",
    });
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

    useEffect(() => {
        console.log("ID del paciente:", id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        // Validaciones básicas
        if (!formData.tipo) {
            alert("Debe seleccionar el tipo de visita");
            return;
        }

        if (!formData.fecha_atencion) {
            alert("Debe seleccionar una fecha de atención");
            return;
        }

        const dataToSave = {
            ...formData,
            id_paciente: Number(id)
        };

        try {
            const response = await fetch("http://localhost:5000/api/visita-domiciliaria", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSave),
            });

            // Manejo de respuesta
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en la respuesta del servidor:", errorData);
                alert(`Error al guardar: ${errorData.message || "Error desconocido"}`);
                return; // Salir de la función
            }

            const result = await response.json();
            console.log("Respuesta del servidor:", result);

            // Resetea el formulario y muestra el modal
            setFormData({
                tipo: "",
                numero_visita: "",
                fecha_atencion: "",
                opcional: "",
                observaciones: "",
            });

            setShowModal(true); // Mostrar el modal de éxito
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error de conexión con el servidor. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div className="visitadomiciliaria-container">
            <div className="visitadomiciliaria-formulario">
                <form onSubmit={handleSubmit}>
                    <h2 className="visitadomiciliaria-titulo">Visita Domiciliaria - Registrar</h2>

                    {/* Modal */}
                    {showModal && (
                        <ModalExito
                            mensaje="¡Visita registrada con éxito!"
                            onClose={() => setShowModal(false)}
                        />
                    )}

                    {/* Resto del formulario */}
                    <div className="visitadomiciliaria-efectividad">
                        <label className="visitadomiciliaria-radio-box">
                            <input
                                type="radio"
                                id="efectiva"
                                name="tipo"
                                value="Efectiva"
                                checked={formData.tipo === "Efectiva"}
                                onChange={handleChange}
                            />
                            <span>Efectiva</span>
                        </label>

                        <label className="visitadomiciliaria-radio-box">
                            <input
                                type="radio"
                                id="noEfectiva"
                                name="tipo"
                                value="No Efectiva"
                                checked={formData.tipo === "No Efectiva"}
                                onChange={handleChange}
                            />
                            <span>No Efectiva</span>
                        </label>
                    </div>

                    {/* Más campos */}
                    <div>
                        <label className="visitadomiciliaria-label"># Visita:</label>
                        <input
                            type="number"
                            name="numero_visita"
                            className="visitadomiciliaria-input"
                            value={formData.numero_visita}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="visitadomiciliaria-label">Fecha Atención:</label>
                        <input
                            type="date"
                            name="fecha_atencion"
                            className="visitadomiciliaria-input"
                            value={formData.fecha_atencion}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="visitadomiciliaria-label">Opcional:</label>
                        <select
                            name="opcional"
                            className="visitadomiciliaria-select"
                            value={formData.opcional}
                            onChange={handleChange}
                        >
                            <option value="Sin Motivo Opcional">Sin Motivo Opcional</option>
                            <option value="Supervision CRED">Supervisión CRED</option>
                            <option value="Supervision Suplementacion">Supervisión Suplementación</option>
                            <option value="Visita por Anemia">Visita por Anemia</option>
                        </select>
                    </div>

                    <div>
                        <label className="visitadomiciliaria-label">Observaciones:</label>
                        <textarea
                            name="observaciones"
                            className="visitadomiciliaria-textarea"
                            value={formData.observaciones}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="visitadomiciliaria-botones">
                        <button type="submit" className="visitadomiciliaria-guardar">
                            Guardar
                        </button>
                        <button type="button" className="visitadomiciliaria-cancelar">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VisitaDomiciliaria;
