import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './datos.css';
import EditPaciente from '../../Her_Pacien_Ninho/EditPaciente';
import { FaUserEdit } from 'react-icons/fa';
import { IoMdFemale, IoMdMale } from "react-icons/io";

const DatosNino = ({ cambiarVista }) => {
    const { historialClinico } = useParams();

    //ESTADO PARA LA VISIBILIDAD DEL PANEL DE EDITPACIENTE 
    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);

    const obtenerDatosPaciente = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/obtener-pacientes/hist-clinico/${historialClinico}`);
            const data = await response.json();
            setPaciente(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los datos del paciente:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerDatosPaciente();
    }, [historialClinico]);

    const calcularEdad = (fechaNacimiento) => {
        const fechaNac = new Date(fechaNacimiento);
        const fechaActual = new Date();

        // Calcular la diferencia en milisegundos
        const diferenciaMilisegundos = fechaActual.getTime() - fechaNac.getTime();

        // Convertir a días
        const diasDiferencia = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

        // Calcular años, meses y días
        const anios = Math.floor(diasDiferencia / 365);
        const meses = Math.floor((diasDiferencia % 365) / 30);
        const dias = Math.floor((diasDiferencia % 365) % 30);

        // Devolver la edad en el formato adecuado
        if (anios > 0) {
            return `${anios} año${anios > 1 ? 's' : ''} ${meses} mes${meses > 1 ? 'es' : ''}`;
        } else if (meses > 0) {
            return `${meses} mes${meses > 1 ? 'es' : ''} ${dias} día${dias > 1 ? 's' : ''}`;
        } else {
            return `${dias} día${dias > 1 ? 's' : ''}`;
        }
    }

    return (
        <div className="datos-nino">
            {loading ? (
                <p>Cargando datos del paciente...</p>
            ) : paciente && (
                <main className='result'>
                    <h3 className='title-page'>Datos del Paciente <span>({paciente.tipo_paciente})</span> </h3>
                    <div className="datos">
                        <p>Hist Clínica:<span>{paciente.hist_clinico} </span></p>
                        <p>Nombres:<span>{paciente.ape_paterno} {paciente.ape_materno} {paciente.nombres}</span></p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>DNI</th>
                                <th>His Clinico</th>
                                <th>Nombres</th>
                                <th>Fech Nacimiento</th>
                                <th>Edad</th>
                                <th>Sexo</th>
                                {paciente.id_responsable && (
                                    <th>Responsable</th>
                                )}
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{paciente.dni}</td>
                                <td>{paciente.hist_clinico}</td>
                                <td>{/* Mostrar ícono basado en el sexo antes del nombre */}
                                    {paciente.sexo === 'Femenino' ? (
                                        <IoMdFemale style={{ color: 'hotpink', marginRight: '5px', fontSize: '15px' }} />
                                    ) : (
                                        <IoMdMale style={{ color: 'blue', marginRight: '5px', fontSize: '15px' }} />
                                    )}
                                    {paciente.ape_paterno} {paciente.ape_materno}, {paciente.nombres}</td>
                                <td>{new Date(paciente.fecha_nacimiento).toLocaleDateString()}</td>
                                <td>{calcularEdad(paciente.fecha_nacimiento)}</td>
                                <td>{paciente.sexo}</td>
                                {paciente.id_responsable && (
                                    <td>{paciente.ape_paterno_res} {paciente.ape_materno_res}, {paciente.nombres_res}</td>
                                )}
                                <td className='bt'><button onClick={() => cambiarVista(<EditPaciente onCloseEdit={cambiarVista} paciente={paciente} />)}><FaUserEdit />Editar</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="ficha-f">
                        <button>Ver Ficha Familiar</button>
                    </div>
                    <div className="reportes">
                        <aside>
                            <p style={{ backgroundColor: 'dodgerblue' }}>CONTROLES CRED</p> {/* Azul claro */}
                            <div className="data">
                                <p>Esperando Datos.....</p>
                            </div>
                        </aside>
                        <aside>
                            <p style={{ backgroundColor: 'rgb(1, 167, 112)' }}>VACUNACIÓN</p> {/* Verde agua */}
                            <div className="data">
                                <p>Esperando Datos.....</p>
                            </div>
                        </aside>
                        <aside>
                            <p style={{ backgroundColor: '#7AA745' }}>SUPLEMENTACIÓN</p> {/* Naranja suave */}
                            <div className="data">
                                <p>Esperando Datos.....</p>
                            </div>
                        </aside>
                        <aside>
                            <p style={{ backgroundColor: '#C95454' }}>ANEMIA</p> {/* Rojo claro */}
                            <div className="data">
                                <p>Esperando Datos.....</p>
                            </div>
                        </aside>
                    </div>
                </main>
            )}
        </div>
    );
};

export default DatosNino;