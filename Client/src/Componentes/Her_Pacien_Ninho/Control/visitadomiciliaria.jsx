import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./VisitaDomiciliaria.module.css"
import ModalExito from "../ModalExito/ModalExito";
import { useLocation } from "react-router-dom";
import OpcionesI from '../OpcionesI'
import NavLogin from '../../Navegadores/NavLogin'
import NavPie from '../../Navegadores/NavPie'

const VisitaDomiciliaria = () => {
    const location = useLocation();
    const { paciente } = location.state || {}; // Evita errores si no hay datos
    const { id } = useParams();
    const [formData, setFormData] = useState({
        tipo: "",
        numero_visita: "",
        fecha_atencion: "",
        opcional: "",
        observaciones: "",
    });
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

    // Función para obtener el próximo número de visita
    const fetchNumeroVisita = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/visita-domiciliaria/numero-visita/${id}`);
            
            if (!response.ok) {
                throw new Error("Error al obtener el número de visita");
            }

            const data = await response.json();

            // Actualizar el número de visita en el estado
            setFormData((prevState) => ({
                ...prevState,
                numero_visita: data.proximoNumeroVisita,
            }));
        } catch (error) {
            console.error("Error:", error);
            // En caso de error, establecer como 1
            setFormData((prevState) => ({
                ...prevState,
                numero_visita: 1,
            }));
        }
    };

    // Llamada inicial al montar el componente
    useEffect(() => {
        fetchNumeroVisita();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Eliminar la capacidad de editar el número de visita
        if (name !== "numero_visita") {
            setFormData({ ...formData, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

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
            id_paciente: Number(id),
        };

        try {
            const response = await fetch("http://localhost:5000/api/visita-domiciliaria", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSave),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error al guardar: ${errorData.message || "Error desconocido"}`);
                return;
            }

            const result = await response.json();
            console.log("Visita guardada:", result);

            // Mostrar modal de éxito
            setShowModal(true);

            // Resetear el formulario
            setFormData({
                tipo: "",
                numero_visita: "",
                fecha_atencion: "",
                opcional: "",
                observaciones: "",
            });

            // Actualizar el próximo número de visita
            fetchNumeroVisita();
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error de conexión con el servidor. Inténtalo de nuevo más tarde.");
        }
    };


    return (
            <div className={styles.visitadomiciliariaFormulario}>
                <NavLogin />
                {paciente ? (
                    <>

                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.visitadomiciliariaTitulo}>Visita Domiciliaria - Registrar</h2>

                            {/* Modal */}
                            {showModal && (
                                <ModalExito
                                    mensaje="¡Visita registrada con éxito!"
                                    onClose={() => setShowModal(false)}
                                />
                            )}

                            <div className={styles.visitadomiciliariaEfectividad}>
                                <label className={styles.visitadomiciliariaRadioBox}>
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

                                <label className={styles.visitadomiciliariaRadioBox}>
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

                            <div className={styles.visitadomiciliariaFila}>
                                <div>
                                    <label className={styles.visitadomiciliariaLabel}># Visita:</label>
                                    <input
                                        type="number"
                                        name="numero_visita"
                                        className={styles.visitadomiciliariaInput}
                                        value={formData.numero_visita}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className={styles.visitadomiciliariaLabel}>Fecha Atención:</label>
                                    <input
                                        type="date"
                                        name="fecha_atencion"
                                        className={styles.visitadomiciliariaInput}
                                        value={formData.fecha_atencion}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={styles.visitadomiciliariaLabel}>Opcional:</label>
                                <select
                                    name="opcional"
                                    className={styles.visitadomiciliariaSelect}
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
                                <label className={styles.visitadomiciliariaLabel}>Observaciones:</label>
                                <textarea
                                    name="observaciones"
                                    className={styles.visitadomiciliariaTextarea}
                                    value={formData.observaciones}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.visitadomiciliariaBotones}>
                                <button type="button" className={styles.visitadomiciliariaCancelar}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.visitadomiciliariaGuardar}>
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <p>No hay datos...</p>
                )}

                <OpcionesI paciente={paciente} />
            <NavPie />
            </div>
    );
};

export default VisitaDomiciliaria;