import React, { useState } from 'react'
import styles from './HistorialTamizaje.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdOutlineManageHistory } from "react-icons/md";

const HistorialTamizaje = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { paciente } = location.state || {};

    // Datos de ejemplo que puedes reemplazar con tus datos reales
    const registros = [
        {
            fecSolicitud: '11-09-2024',
            tamizaje: 'Dosaje de Hemoglobina',
            fecResultado: '11-09-2024',
            resultado: '0',
            fecAtencion: '11-09-2024',
            edad: '2a 04m 06d'
        }
    ];

    const NuevoTamizaje = () => {
        navigate(`/tamizaje/${paciente.hist_clinico}`, { state: { paciente } });
    }

    return (
        <div>
            {paciente ? (
                <>
                    {/* {paciente.nombres} {paciente.ape_paterno} { paciente.ape_materno} */}
                    <div className={styles.container}>
                        <div>
                            <Link to={`/panel/${paciente.hist_clinico}`} className=''>
                                <RiPlayReverseLargeFill /> VOLVER
                            </Link>
                        </div>
                        <div className={styles.titHist}>
                            <h3>control {paciente.hist_clinico} - {paciente.nombres} {paciente.ape_paterno} {paciente.ape_materno}</h3>
                            <button onClick={NuevoTamizaje}><MdOutlineManageHistory />Nuevo Tamizaje</button>
                        </div>

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Fec. Solicitud</th>
                                        <th>Tamizaje</th>
                                        <th>Fec. Resultado</th>
                                        <th>Resultado</th>
                                        <th>Fec. Atención</th>
                                        <th>Edad</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registros.map((registro, index) => (
                                        <tr key={index}>
                                            <td>{registro.fecSolicitud}</td>
                                            <td>{registro.tamizaje}</td>
                                            <td>{registro.fecResultado}</td>
                                            <td>{registro.resultado}</td>
                                            <td>{registro.fecAtencion}</td>
                                            <td>{registro.edad}</td>
                                            <td>
                                                <button className={styles.actionButton}>✏️</button>
                                                <button className={styles.actionButton}>❌</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination">
                                <button>Primero</button>
                                <button>Anterior</button>
                                <button>Siguiente</button>
                                <button>Último</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>aaaa</p>
            )}

        </div>
    )
}

export default HistorialTamizaje