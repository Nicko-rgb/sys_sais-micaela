import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './panelpaciente.css';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import { PiNotePencil } from "react-icons/pi";
import { TbMedicineSyrup } from "react-icons/tb";
import { MdOutlineBloodtype, MdOutlineVaccines } from "react-icons/md";
import { IoBody, IoCaretBack } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
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
    const [renderView, setRenderView] = useState(null);
    const [botonActivo, setBotonActivo] = useState('inicio');
    const [menuState, setMenuState] = useState({});

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

    const toggleMenu = (menu) => {
        setMenuState((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };


    return (
        <div className="panel-paci">
            <NavLogin />
            <section className="izquierda">
                <p className='cabeza'>Menú de Opciones</p>
                <div className="opciones">
                    <Link to='/admision' className="link_volver"><IoCaretBack className='ico-volver' />VOLVER</Link>
                    <button className={`btn-inicio ${botonActivo === 'inicio' ? 'activo' : ''}`} onClick={() => { setBotonActivo('inicio'); renderComponente(<DatosNino cambiarVista={renderComponente} />); }} ><GoHome className='ico-home' />Inicio</button>
                    <details name='opcion'>
                        <summary onClick={() => toggleMenu('control')}><PiNotePencil className="icon" />Control{menuState.control ? <IoIosArrowDown className='ico-open' /> : <IoIosArrowForward className='ico-close' />} </summary>
                        <button className={botonActivo === 'btn1' ? 'activo' : ''} onClick={() => { setBotonActivo('btn1'); renderComponente(<Control paciente={paciente} />) }}>Control Niño</button>
                        <button className={botonActivo === 'btn2' ? 'activo' : ''} onClick={() => { setBotonActivo('btn2'); renderComponente(<Seguimientonutricional paciente={paciente} />); }}>Seguimiento Nutricional</button>
                        <button className={botonActivo === 'btn3' ? 'activo' : ''} onClick={() => { setBotonActivo('btn3'); renderComponente(<HistorialControles paciente={paciente} />); }}> Hist de Controles</button>
                        <button className={botonActivo === 'btn4' ? 'activo' : ''} onClick={() => { setBotonActivo('btn4'); renderComponente(<ActualizarControles cambiarVista={renderComponente} paciente={paciente} />); }}>Actualizar Controles</button>
                        <button className={botonActivo === 'btn5' ? 'activo' : ''} onClick={() => { setBotonActivo('btn5'); renderComponente(<VisitaDomiciliaria cambiarVista={renderComponente} paciente={paciente} />); }} >Visita Domiciliaria</button>
                        <button className={botonActivo === 'btn6' ? 'activo' : ''} onClick={() => { setBotonActivo('btn6'); renderComponente(<HistorialVisitas cambiarVista={renderComponente} paciente={paciente} />); }} >Hist Visita</button>
                    </details>

                    <details name="opcion">
                        <summary onClick={() => toggleMenu('suplementos')}><TbMedicineSyrup className="icon" />Suplementos{menuState.suplementos ? <IoIosArrowDown className='ico-open' /> : <IoIosArrowForward className='ico-close' />}</summary>
                        <button className={botonActivo === 'btn7' ? 'activo' : ''} onClick={() => {setBotonActivo('btn7'); renderComponente(<Entregasuplemento paciente={paciente} />)}}>Entrega Suplemento</button>
                        <button className={botonActivo === 'btn8' ? 'activo' : ''} onClick={() => {setBotonActivo('btn8'); renderComponente(<Listasumplemento cambiarVista={renderComponente} paciente={paciente} />)}}>Historial Suplemento</button>
                        <button className={botonActivo === 'btn9' ? 'activo' : ''} onClick={() => {setBotonActivo('btn9'); renderComponente(<Actualizarsuplementos cambiarVista={renderComponente} paciente={paciente} />)}}>Actualizar Suplementos</button>
                    </details>

                    <details name="opcion">
                        <summary onClick={() => toggleMenu('tamizaje')}><MdOutlineBloodtype className="icon" />Tamizaje{menuState.tamizaje ? <IoIosArrowDown className='ico-open' /> : <IoIosArrowForward className='ico-close' />}</summary>
                        <button className={botonActivo === 'btn10' ? 'activo' : ''} onClick={() => {setBotonActivo('btn10'); renderComponente(<TamizajeDozaje cambiarVista={renderComponente} paciente={paciente} />)}}>Tamizaje-Dozaje</button>
                        <button className={botonActivo === 'btn11' ? 'activo' : ''} onClick={() => {setBotonActivo('btn11'); renderComponente(<HistorialTamizaje cambiarVista={renderComponente} paciente={paciente} />)}}>Historial Tamizaje</button>
                    </details>

                    <details name="opcion">
                        <summary onClick={() => toggleMenu('psicomotor')}><IoBody className="icon" />Psicomotor{menuState.psicomotor ? <IoIosArrowDown className='ico-open' /> : <IoIosArrowForward className='ico-close' />}</summary>
                        <button className={botonActivo === 'btn12' ? 'activo' : ''} onClick={() => {setBotonActivo('btn12'); renderComponente(<EvaluacionPsicomotor paciente={paciente} />)}}>Evaluación Psicomotor</button>
                        <button className={botonActivo === 'btn13' ? 'activo' : ''} onClick={() => {setBotonActivo('btn13'); renderComponente(<HistorialPsicomotor cambiarVista={renderComponente} paciente={paciente} />)}}>Historial Psicomotor</button>
                    </details>

                    <details name="opcion">
                        <summary onClick={() => toggleMenu('vacuna')}><MdOutlineVaccines className="icon" />Vacuna{menuState.vacuna ? <IoIosArrowDown className='ico-open' /> : <IoIosArrowForward className='ico-close' />}</summary>
                        <button className={botonActivo === 'btn14' ? 'activo' : ''} onClick={() => {setBotonActivo('btn14'); renderComponente(<VacunarNino paciente={paciente} />)}}>Vacunar Niño</button>
                        <button className={botonActivo === 'btn15' ? 'activo' : ''} onClick={() => {setBotonActivo('btn15'); renderComponente(<HistorialVacunas paciente={paciente} />)}}>Historial Vacunas</button>
                        <button className={botonActivo === 'btn16' ? 'activo' : ''} onClick={() => {setBotonActivo('btn16')}} >Vacunas Faltantes</button>
                    </details>
                    <button>Ficha Familiar</button>
                </div>
            </section>

            {/* Renderiza dinámicamente el componente seleccionado */}
            <main className='renders'>
                {renderView ?
                    renderView
                    :
                    <DatosNino cambiarVista={renderComponente} />
                }
            </main>

            <NavPie />
        </div>
    );
};

export default PanelPaciente;
