import React, { useState, useEffect } from "react";
import "./sector.css";
import { PiGearBold, PiUsersBold } from "react-icons/pi";
import { TbListCheck } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { MdOutlineManageSearch } from "react-icons/md";
import { TbMapPinCog } from "react-icons/tb";
import Store from "../../Store/Store_Cita_Turno";
import Mapa from "./Mapa";
import { TablaForSector } from '../infoTurno/MiniCompont';
import FormSector from "./FormSector";

const Sectores = ({ personData }) => {
    const navigate = useNavigate();
    const [viewConfig, setViewConfig] = useState(false);
    const [viewDataMap, setViewDataMap] = useState(false)
    const [viewPerson, setViewPerson] = useState(false);
    const [viewList, setViewList] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    const [selectManzana, setSelectManzana] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");
    const { personalSalud, sectorPer } = Store();

    const volverPage = () => {
        navigate('/personal-salud');
    };

    const handleViewList = () => {
        setViewList(!viewList);
        setViewConfig(false);
        setViewPerson(false);
        setActiveIcon('list');
        setSearchTerm('')
        setSelectManzana(null)
    };

    const handleViewDataMap = () => {
        setViewDataMap(!viewDataMap)
        setViewConfig(false);
        setViewPerson(false);
        setActiveIcon('map');
        setSearchTerm('')
        setSelectManzana(null)
    }

    const handleViewPerson = () => {
        setViewPerson(!viewPerson);
        setViewConfig(false);
        setViewList(false);
        setActiveIcon('person');
        setSearchTerm('')
        setSelectManzana(null)
    };

    const handleViewConfig = () => {
        setViewConfig(!viewConfig);
        setViewPerson(false);
        setViewList(false);
        setActiveIcon('config');
        setSelectManzana(null)
    };

    const closeMenu = () => {
        if(!viewConfig && !viewPerson && !viewList) {
            setActiveIcon(null);
        }
    };
    
    useEffect(() => {
        if (selectManzana) {
            setViewConfig(false);
            setViewPerson(false);
            setViewList(false);
            setActiveIcon(null)
        }
    }, [selectManzana]);

    return (
        <div className="sector" onClick={closeMenu}>
            <h3>Mapa del Centro de Salud Micaela Bastidas - SAIS {personData ? personData.nombres : "----"}</h3>
            <div className="ev">
                <div className="menus">
                    <div onClick={(e) => e.stopPropagation()}>
                        <PiGearBold
                            onClick={handleViewConfig}
                            className={`icon ${activeIcon === 'config' ? 'active' : ''}`}
                        />
                        {!viewConfig &&
                            <p className="etiqueta">Configuración</p>
                        }
                    </div>
                    <div>
                        <TbMapPinCog className={`icon ${activeIcon === 'datamap' ? 'active' : ''}`} />
                        {!viewDataMap &&
                            <p className="etiqueta">Datos de Manzana</p>
                        }
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                        <PiUsersBold
                            onClick={handleViewPerson}
                            className={`icon ${activeIcon === 'person' ? 'active' : ''}`}
                        />
                        {!viewPerson &&
                            <p className="etiqueta">Personales de Salud</p>
                        }
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                        <TbListCheck
                            onClick={handleViewList}
                            className={`icon ${activeIcon === 'list' ? 'active' : ''}`}
                        />
                        {!viewList &&
                            <p className="etiqueta">Profesionales con Sector</p>
                        }
                    </div>
                    <div>
                        <RiLogoutCircleLine onClick={() => volverPage()} className="icon" />
                        <p className="etiqueta">Salir</p>
                    </div>
                    <div className="map-ico">
                        <GrMapLocation className="map" />
                        <span>SAIS</span>
                    </div>
                </div>
                <section className={`nodatas ${viewPerson || viewList || viewConfig || selectManzana ? 'datass' : ''} `} >
                    {viewPerson &&
                        <div className="boxs">
                            <div className="search">
                                <p>PERSONALES DE SALUD</p>
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, dni...."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdOutlineManageSearch className="ico-search" />
                            </div>
                            <TablaForSector data={personalSalud} searchTerm={searchTerm} />
                            
                        </div>
                    }
                    {viewList &&
                        <div className="boxs">
                            <div className="search">
                                <p>PROFESIONALES CON SECTOR</p>
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdOutlineManageSearch className="ico-search" />
                            </div>
                            <TablaForSector data={sectorPer} searchTerm={searchTerm} />
                        </div>
                    }
                    {viewConfig &&
                        <div className="boxs">
                            <h3>Configuracion</h3>
                            <button>Eliminar</button>
                            <button>Guardar</button>
                            <button>Cerrar</button>
                            <button>Enviar</button>
                        </div>
                    }
                    {selectManzana && 
                    <div className="boxs bform">
                        <FormSector manzana={selectManzana} closeForm={() => setSelectManzana(null)} />
                    </div>
                    }
                </section>
                <main className="content">
                    <Mapa selectManzana={selectManzana} setSelectManzana={setSelectManzana} />
                </main>
            </div>
        </div>
    );
};

export default Sectores;
