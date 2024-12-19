import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './panelnino.css';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import { PiNotePencil } from "react-icons/pi";
import { TbMedicineSyrup } from "react-icons/tb";
import { MdOutlineBloodtype, MdOutlineVaccines } from "react-icons/md";
import { IoBody, IoCaretBack } from "react-icons/io5";
import DatosNino from './Ninho/DatosNino';
import VisitaDomiciliaria from '../Her_Pacien_Ninho/Control/visitadomiciliaria';
import HistorialVisitas from '../Her_Pacien_Ninho/Control/historialvisitas';
import Seguimientonutricional from '../Her_Pacien_Ninho/Control/seguimientonutricional';
import Control from '../Her_Pacien_Ninho/Control/control';
import HistorialControles from '../Her_Pacien_Ninho/Control/historialcontroles';
import ActualizarControles from '../Her_Pacien_Ninho/Control/actualizarControles';
import Actualizarsuplementos from '../Her_Pacien_Ninho/Suplemento/actualizarsuplemento';
import EvaluacionPsicomotor from '../Her_Pacien_Ninho/Psicomotor/EvaluacionPsicomotor';
import HistorialPsicomotor from '../Her_Pacien_Ninho/Psicomotor/HistorialPsicomotor';
import TamizajeDozaje from '../Her_Pacien_Ninho/Tamizaje/TamizajeDozaje';
import HistorialTamizaje from '../Her_Pacien_Ninho/Tamizaje/HistorialTamizaje';
import Entregasuplemento from '../Her_Pacien_Ninho/Suplemento/Entregasuplemento';
import Listasumplemento from '../Her_Pacien_Ninho/Suplemento/Listasumplemento';
import VacunarNino from '../Her_Pacien_Ninho/vacuna/VacunarNino';
import HistorialVacunas from '../Her_Pacien_Ninho/vacuna/HistorialVacunas';

const PanelPaciente = () => {
    const { historialClinico } = useParams();
    const [paciente, setPaciente] = useState(null);
    const [renderView, setRenderView] = useState(<DatosNino />); // Estado para renderizar el componente
    const [botonActivo, setBotonActivo] = useState(null);

    const obtenerDatosPaciente = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/obtener-pacientes/hist-clinico/${historialClinico}`);
            const data = await response.json();
            setPaciente(data);
        } catch (error) {
            console.error('Error al obtener los datos del paciente:', error);
        }
    };

    useEffect(() => {
        obtenerDatosPaciente();
    }, [historialClinico]);

    // Funciones para manejar el cambio de componente
    const renderComponente = (componente) => {
        setRenderView(componente);
    };

    return (
        <div className="panel-nino">
            <NavLogin />
            <section className="izquierda">
                <p className='cabeza'>Menú de Opciones</p>
                <div className="opciones">
                    <Link to='/admision' className="link_volver"><IoCaretBack className='ico-volver' />VOLVER</Link>
                    <button className={botonActivo === 'inicio' ? 'btn-active' : ''}
                        onClick={() => {
                            setBotonActivo('inicio')
                            renderComponente(<DatosNino cambiarVista={renderComponente} />);
                        }}
                    >
                        INICIO
                    </button>
                    <details name="opcion" className="item">
                        <summary><PiNotePencil className="icon" />Control</summary>
                        <button className={botonActivo === 'control-nino' ? 'btn-active' : ''}
                            onClick={() => {
                                setBotonActivo('control-nino');
                                renderComponente(<Control paciente={paciente} />);
                            }}
                        >
                            CONTROL NIÑO
                        </button>
                        <button className={botonActivo === 'seguimiento-nutricional' ? 'btn-active' : ''}
                            onClick={() => {
                                setBotonActivo('seguimiento-nutricional');
                                renderComponente(<Seguimientonutricional paciente={paciente} />);
                            }}
                        >
                            SEGUIMIENTO NUTRICIONAL
                        </button>
                        <button className={botonActivo === 'historial-controles' ? 'btn-active' : ''}
                            onClick={() => {
                                setBotonActivo('historial-controles');
                                renderComponente(<HistorialControles paciente={paciente} />);
                            }}
                        >
                            HIST DE CONTROLES
                        </button>
                        <button className={botonActivo === 'actualizar-controles' ? 'btn-active' : ''}
                            onClick={() => {
                                setBotonActivo('actualizar-controles');
                                renderComponente(<ActualizarControles cambiarVista={renderComponente} paciente={paciente} />);
                            }}
                        >
                            ACTUALIZAR CONTROLES
                        </button>
                        <button
                            className={botonActivo === 'visita-domiciliaria' ? 'btn-active' : ''}
                            onClick={() => {
                                setBotonActivo('visita-domiciliaria');
                                renderComponente(<VisitaDomiciliaria cambiarVista={renderComponente} paciente={paciente} />);
                            }}
                        >
                            VISITA DOMICILIARIA
                        </button>
                        <button
                            className={botonActivo === 'historial-visitas' ? 'btn-active' : ''}
                            onClick={() => {
                                setBotonActivo('historial-visitas');
                                renderComponente(<HistorialVisitas cambiarVista={renderComponente} paciente={paciente} />);
                            }}
                        >
                            HIST DE VISITA
                        </button>
                    </details>

                    <details name="opcion" className="item">
                        <summary><TbMedicineSyrup className="icon" />Suplementos</summary>
                        <button onClick={() => renderComponente(<Entregasuplemento paciente={paciente} />)}>Entrega Suplemento</button>
                        <button onClick={() => renderComponente(<Listasumplemento cambiarVista={renderComponente} paciente={paciente} />)}>Historial Suplemento</button>
                        <button onClick={() => renderComponente(<Actualizarsuplementos cambiarVista={renderComponente} paciente={paciente} />)}>Actualizar Suplementos</button>
                    </details>

                    <details name="opcion" className="item">
                        <summary><MdOutlineBloodtype className="icon" />Tamizaje</summary>
                        <button onClick={() => renderComponente(<TamizajeDozaje cambiarVista={renderComponente} paciente={paciente} />)}>Tamizaje-Dozaje</button>
                        <button onClick={() => renderComponente(<HistorialTamizaje cambiarVista={renderComponente} paciente={paciente} />)}>Historial Tamizaje</button>
                    </details>

                    <details name="opcion" className="item">
                        <summary><IoBody className="icon" />Psicomotor</summary>
                        <button onClick={() => renderComponente(<EvaluacionPsicomotor paciente={paciente} />)}>Evaluación Psicomotor</button>
                        <button onClick={() => renderComponente(<HistorialPsicomotor cambiarVista={renderComponente} paciente={paciente} />)}>Historial Psicomotor</button>
                    </details>

                    <details name="opcion" className="item">
                        <summary><MdOutlineVaccines className="icon" />Vacuna</summary>
                        <button onClick={() => renderComponente(<VacunarNino paciente={paciente} />)}>Vacunar Niño</button>
                        <button onClick={() => renderComponente(<HistorialVacunas paciente={paciente} />)}>Historial Vacunas</button>
                        <button>Vacunas Faltantes</button>
                    </details>
                </div>
            </section>

            {/* Renderiza dinámicamente el componente seleccionado */}
            <main className='renders'>
                {renderView}
            </main>

            <NavPie />
        </div>
    );
};

export default PanelPaciente;
