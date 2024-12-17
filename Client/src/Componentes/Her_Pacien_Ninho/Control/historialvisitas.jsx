import React, { useEffect, useState } from 'react';
import "./estilosGeneralControl.css";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NavLogin from '../../Navegadores/NavLogin'
import NavPie from '../../Navegadores/NavPie'
import OpcionesI from "../OpcionesI";

const HistorialVisitas = () => {
    const { id_paciente } = useParams();
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { paciente } = location.state || {}; // Extrae paciente del state...

    const handleNewVisitClick = () => {
        navigate(/visita/${paciente.hist_clinico}, { state: { paciente } })
    };

    useEffect(() => {
        const fetchVisitas = async () => {
            try {
                setLoading(true);
                const response = await fetch(http://localhost:5000/api/visita-domiciliaria/${id_paciente});

                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);

                const data = await response.json();
                console.log('Datos recibidos:', data);

                setVisitas(data.visitas || []);
            } catch (err) {
                console.error('Error completo:', err);
                setError(err.message || "Error al obtener las visitas");
            } finally {
                setLoading(false);
            }
        };

        fetchVisitas();
    }, [id_paciente]);

    return (
        <div className='HistorialVisitas-container'>
            <NavLogin/>
            <div className="HistorialVisitas">
                <OpcionesI paciente={paciente}/>
                {paciente ? (
                    <>
                        <button className="HistorialVisitas__new-visit" onClick={handleNewVisitClick}>
                            + Nueva Visita
                        </button>
                        <h2 className="HistorialVisitas__title">Listado de Visitas Domiciliarias</h2>
                        <div className="HistorialVisitas__search">
                            <label className='labelBuscar' htmlFor="buscar-registro">Buscar registro:</label>
                            <input className="inputBuscar" type="text" id="buscar-registro" placeholder="Buscar registro" />
                        </div>
                        {loading ? (
                            <p>Cargando datos...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : (
                            <table className="HistorialVisitas__table">
                                <thead>
                                    <tr>
                                        <th>Fecha Visita</th>
                                        <th>Edad</th>
                                        <th>#Visita</th>
                                        <th>Opcional</th>
                                        <th>Estado</th>
                                        <th>C</th>
                                        <th>S</th>
                                        <th>V</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visitas.length > 0 ? (
                                        visitas.map((visita) => (
                                            <tr key={visita.id_visita}>
                                                <td>{visita.fecha_atencion}</td>
                                                <td>{visita.edad_paciente}</td>
                                                <td>{visita.numero_visita}</td>
                                                <td>{visita.opcional || "N/A"}</td>
                                                <td>{visita.tipo}</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>
                                                    <button>Editar</button>
                                                    <button>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9">No hay datos disponibles</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                        <div className="HistorialVisitas__pagination">
                            <span>Mostrando {visitas.length} de {visitas.length} registros</span>
                            <div className="HistorialVisitas__pagination-controls">
                                <button disabled>Primero</button>
                                <button disabled>{'<'}</button>
                                <button disabled>{'>'}</button>
                                <button disabled>Último</button>
                            </div>
                        </div>
                    </>) : (
                    <p>No hay datos...</p>
                )}

            </div>
            <NavPie/>
        </div>
    );
};

export default HistorialVisitas;