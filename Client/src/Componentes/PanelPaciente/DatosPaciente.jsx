import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './datospaciente.css';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import OpcionesD from '../Her_Pacien_Ninho/OpcionesD';
import OpcionesI from '../Her_Pacien_Ninho/OpcionesI';
import EditPaciente from '../Her_Pacien_Ninho/EditPaciente';
import { FaUserEdit } from 'react-icons/fa';
import { IoMdFemale, IoMdMale } from "react-icons/io";
import Control from '../Her_Pacien_Ninho/Control/control';

const DatosPaciente = () => {
    const { historialClinico } = useParams(); // Obtener el historial clínico de la ruta

    //ESTADO PARA LA VISIBILIDAD DEL PANEL DE EDITPACIENTE 
    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false)

    // Función para manejar el clic en el botón
    const edicionPaciente = () => {
        setEdit(!edit); // Cambia el estado a true para mostrar ComponenteB 
    };

    const obtenerDatosPaciente = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/pacientes/${historialClinico}`); // Ajusta la ruta según tu API
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
        <div className="datos-paciente">
            <NavLogin />
            <OpcionesI paciente={paciente} />
            <OpcionesD pacienteDatos={paciente} />
            <main>
                {loading ? (
                    <p>Cargando datos del paciente...</p>
                ) : paciente && (
                    <div className='box-result'>
                        <h3 className='txt1'>Datos del Paciente <span>({paciente.tipo_paciente})</span> </h3>
                        <h5 className='name-paciente'><p>({paciente.hist_clinico})</p> {paciente.ape_paterno} {paciente.ape_materno}, {paciente.nombres}</h5>
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
                                    <td><button onClick={edicionPaciente}><FaUserEdit />Editar</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="reportes-control">
                            <aside>
                                <p style={{ backgroundColor: '#589FC4' }}>CONTROLES CRED</p> {/* Azul claro */}
                            </aside>
                            <aside>
                                <p style={{ backgroundColor: '#D07D10' }}>VACUNACIÓN</p> {/* Verde agua */}
                            </aside>
                            <aside>
                                <p style={{ backgroundColor: '#7AA745' }}>SUPLEMENTACIÓN</p> {/* Naranja suave */}
                            </aside>
                            <aside>
                                <p style={{ backgroundColor: '#C95454' }}>ANEMIA</p> {/* Rojo claro */}
                            </aside>
                        </div>
                    </div>
                )}
            </main>

            <NavPie />
            {edit && (
                <EditPaciente paciente={paciente} onCloseEdit={edicionPaciente} />
            )}
        </div>
    );
};

export default DatosPaciente;