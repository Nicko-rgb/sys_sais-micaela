import React, { useEffect, useState } from 'react';
import "./estilosGeneralControl.css";
import { useNavigate, useParams } from 'react-router-dom';
import ModalExito from "../ModalExito/ModalExito";
import ActualizarVisitaDomiciliaria from './ActualizarVisitaDomiciliaria';

const HistorialVisitas = () => {
    const { id_paciente } = useParams();
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVisitId, setSelectedVisitId] = useState(null); // Estado para el ID de la visita seleccionada
    const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para mostrar el modal de éxito
    const [filteredVisitas, setFilteredVisitas] = useState([]);
    const navigate = useNavigate();

    const handleNewVisitClick = () => {
        navigate(/visita/${id_paciente});
    };

    const handleEliminar = async (id_visita) => {
        console.log("Intentando eliminar visita con ID:", id_visita);
        try {
            const response = await fetch(http://localhost:5000/api/visita-domiciliaria/${id_visita}, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok) {
                console.log("Visita eliminada con éxito:", data);
                setVisitas(visitas.filter(visita => visita.id_visita !== id_visita));
                setFilteredVisitas(visitas.filter(visita => visita.id_visita !== id_visita));
                setShowSuccessModal(true); // Mostrar modal de éxito
            } else {
                setError(data.error || 'Error al eliminar la visita');
            }
        } catch (err) {
            setError(err.message || 'Error al eliminar la visita');
        }
    };

    const recargarVisitas = async () => {
        try {
            setLoading(true);
            const response = await fetch(http://localhost:5000/api/visita-domiciliaria/${id_paciente});
            const data = await response.json();
            setVisitas(data.visitas || []);
            setFilteredVisitas(data.visitas || []);
        } catch (err) {
            setError(err.message || "Error al obtener las visitas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        recargarVisitas();
    }, [id_paciente]);

    const formatDate = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        return ${dia}/${mes}/${anio};
    };

    const handleEditar = (id_visita) => {
        console.log("Visitando para editar la visita con ID:", id_visita);
        setSelectedVisitId(id_visita);
        setShowEditModal(true); // Mostrar el modal de edición
    };

    return (
        <div className='HistorialVisitas-container'>
            <div className="HistorialVisitas">
                <button className="HistorialVisitas__new-visit" onClick={handleNewVisitClick}>
                    + Nueva Visita
                </button>
                <h2 className="HistorialVisitas__title">Listado de Visitas Domiciliarias</h2>
                
                {loading ? (
                    <p>Cargando datos...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div className="HistorialVisitas__table-container">
                        <table className="HistorialVisitas__table">
                            <thead>
                                <tr>
                                    <th>Fecha Visita</th>
                                    <th>Edad</th>
                                    <th>#Visita</th>
                                    <th>Opcional</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitas.length > 0 ? (
                                    visitas.map((visita) => (
                                        <tr key={visita.id_visita}>
                                            <td>{formatDate(visita.fecha_atencion)}</td>
                                            <td>{visita.edad_paciente}</td>
                                            <td>{visita.numero_visita}</td>
                                            <td>{visita.opcional || "N/A"}</td>
                                            <td>{visita.tipo}</td>
                                            <td>
                                                <button onClick={() => handleEditar(visita.id_visita)}>Editar</button>
                                                <button onClick={() => handleEliminar(visita.id_visita)}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No hay datos disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal para Actualizar */}
            {showEditModal && selectedVisitId && (
                <ActualizarVisitaDomiciliaria
                    idVisita={selectedVisitId}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedVisitId(null);
                        recargarVisitas();
                    }}
                />
            )}

            {/* Modal de Éxito */}
            {showSuccessModal && (
                <ModalExito
                    mensaje="¡Visita eliminada con éxito!"
                    onClose={() => setShowSuccessModal(false)}
                />
            )}
        </div>
    );
};

export default HistorialVisitas;