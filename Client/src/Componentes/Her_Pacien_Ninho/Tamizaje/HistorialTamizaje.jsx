import React from 'react'
import styles from './HistorialTamizaje.module.css';
import { Link } from 'react-router-dom'
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { MdOutlineManageHistory } from "react-icons/md";
import NavLogin from '../../Navegadores/NavLogin'
import NavPie from '../../Navegadores/NavPie';
import TamizajeDozaje from './TamizajeDozaje';

const HistorialTamizaje = ({paciente, cambiarVista}) => {

    // Datos de ejemplo que puedes reemplazar con tus datos reales
    const registros = [
        {
            id: 1,
            fecSolicitud: '11-09-2  024',
            tamizaje: 'Dosaje de Hemoglobina',
            fecResultado: '11-09-2024',
            resultado: '0',
            fecAtencion: '11-09-2024',
            edad: '2a 04m 06d'
        }, {
            id: 2,
            fecSolicitud: '11-09-2024',
            tamizaje: 'Dosaje de Hemoglobina',
            fecResultado: '11-09-2024',
            resultado: '0',
            fecAtencion: '11-09-2024',
            edad: '2a 04m 06d'
        }
    ];

    return (
        <div>
            <NavLogin />
            <div className={styles.contGeneral}>

                {paciente ? (
                    <>

                        <div>
                            <Link to={`/panel/${paciente.hist_clinico}`} className={styles.volver_link}>
                                <RiPlayReverseLargeFill /> VOLVER
                            </Link>
                        </div>
                        {/* {paciente.nombres} {paciente.ape_paterno} { paciente.ape_materno} */}
                        <div className={styles.container}>
                            <div className={styles.titHist}>
                                <h3>{paciente.hist_clinico} - {paciente.nombres} {paciente.ape_paterno} {paciente.ape_materno}</h3>
                                <button onClick={()=>cambiarVista(<TamizajeDozaje cambiarVista={cambiarVista} paciente={paciente} />)}><MdOutlineManageHistory />Nuevo Tamizaje</button>
                            </div>

                            <div className={styles.table_responsive}>
                                <table className={styles.table}>
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
                                                <td className={styles.button}>
                                                    <button className={styles.actionButton}>✏️</button>
                                                    <button className={styles.actionButton}>❌</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* <div className={styles.pagination}>
                                <button>Primero</button>
                                <button>Anterior</button>
                                <button>Siguiente</button>
                                <button>Último</button>
                            </div> */}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>aaaa</p>
                )}

            </div>
            <NavPie />
        </div>
    )
}

export default HistorialTamizaje