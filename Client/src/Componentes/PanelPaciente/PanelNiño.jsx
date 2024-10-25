import './panelniño.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import { FaCheckCircle, FaRoad, FaAmbulance } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { FaFileCircleCheck } from "react-icons/fa6";
import { LiaUserNurseSolid } from "react-icons/lia";
import { TbNurse, TbVaccine } from "react-icons/tb";
import { MdOutlinePregnantWoman, MdOutlineControlPoint, MdDateRange } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { RiPlayReverseLargeFill } from "react-icons/ri";

const Panel = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleLinkClick = () => {
        // Cierra el modal antes de redirigir
        closeModal();
    };

    return (
        <div className="panel">
            <NavLogin />
            <div className="sub_panel">
                <h5>Panel de Servicios Para el Niño</h5>
                <div className='box_opciones'>
                    <Link to='/panel' className='volver_link'>
                        <RiPlayReverseLargeFill /> VOLVER
                    </Link>
                    <h4><FaFileCircleCheck />Admisión</h4>
                    <hr />
                    <hr />
                    <div className="boxs">
                        <Link className="box" to='/panel-cita'>
                            <h5><MdDateRange className='icon_box' style={{ background: 'rgb(99, 191, 209)' }} /> Citas</h5>
                            <p>OTORGAR CITAS</p>
                        </Link>
                        <button className="box" onClick={openModal}>
                            <h5><FaCheckCircle className="icon_box" style={{ background: 'rgb(32, 180, 111)' }} /> Acreditación</h5>
                            <p>VERIFICA AFILIACIÓN</p>
                        </button>
                        <Link className="box" to='/personal-salud'>
                            <h5><HiUsers className="icon_box" style={{ background: 'gray' }} /> Personal</h5>
                            <p>USUARIO DE ACCESO</p>
                        </Link>
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal">
                        <div className="modal_content">
                            <h4>Elige una opción</h4>
                            <div className="modal_buttons">
                                {/* <div></div> */}
                                <a href='http://app3.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx' target="_blank" rel="noopener noreferrer" className="modal_link" onClick={handleLinkClick}>
                                    Ir a SIS
                                </a>
                                <a href='https://app8.susalud.gob.pe:8380/login' target="_blank" rel="noopener noreferrer" className="modal_link" onClick={handleLinkClick}>
                                    Ir a SITEDS
                                </a>
                                
                            </div>
                            <button onClick={closeModal} className="modal_close">Cancelar</button>
                        </div>
                    </div>
                )}

                <div className='box_opciones'>
                    <h4><TbNurse />Enfermería</h4>
                    <hr />
                    <hr />
                    <div className="boxs">
                        <Link to={'/list/Niño'} className="box">
                            <h5><GrFormView className="icon_box" style={{ background: 'rgb(99, 191, 209)' }} />CRED</h5>
                            <p>CONTROL Y DESARROLLO</p>
                        </Link>
                        <Link className="box">
                            <h5><TbVaccine className="icon_box" style={{ background: 'red' }} />Vacuna</h5>
                            <p>CALENDARIO DE INMUNIZACIÓN</p>
                        </Link>
                        <Link className="box">
                            <h5><FaRoad className="icon_box" />Visitas</h5>
                            <p>VISITAS DOMICILIARIAS</p>
                        </Link>
                    </div>
                </div>
                <div className='box_opciones'>
                    <h4><LiaUserNurseSolid />Obstetricia</h4>
                    <hr />
                    <hr />
                    <div className="boxs">
                        <Link className="box">
                            <h5> <MdOutlinePregnantWoman className="icon_box" style={{ background: 'rgb(183, 68, 97)' }} />Gestante</h5>
                            <p>REGISTRO DE GESTANTES</p>
                        </Link>
                        <Link className="box">
                            <h5> <MdOutlineControlPoint className="icon_box" style={{ background: 'green' }} /> A.P.N</h5>
                            <p>CONTROL DE LA GESTANTE</p>
                        </Link>
                        <Link className="box">
                            <h5> <FaAmbulance className="icon_box" style={{ background: 'rgb(209, 46, 122)' }} />Partos</h5>
                            <p>REGISTRO DE PARTOS</p>
                        </Link>
                    </div>
                </div>
            </div>
            <NavPie />
        </div>
    );
};

export default Panel;
 