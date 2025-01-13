import React, { useState, useEffect } from "react";
import "./sector.css";
import { PiGearBold, PiUsersBold } from "react-icons/pi";
import { TbListCheck, TbMapPinCog } from "react-icons/tb";
import { RiLogoutCircleLine, RiPuzzleFill } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { FaRoad } from "react-icons/fa6";
import { MdOutlineManageSearch, MdTsunami, MdOutlineViewInAr } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Store from "../../Store/Store_Cita_Turno";
import Mapa from "./Mapa";
import { TablaForSector } from "../infoTurno/MiniCompont";
import FormSector from "./FormSector";
import Familias from "./Familias";
import Coordenada from "./Coordenada";
import puntoCar from '../../IMG/puntoCardinal.png'
import mbba_b from '../../IMG/mbba-mmba.png'
import Minimap from "./Minimap";
import Config from "./Config";
import NotasManzana from "./NotasManzana";

const Sectores = () => {
    const navigate = useNavigate();
    const { personalSalud, sectorPer } = Store();
    const { colors } = Coordenada()

    // Estados
    const [activeView, setActiveView] = useState(null);
    const [selectManzana, setSelectManzana] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewDataMap, setViewDataMap] = useState(true)

    // Funciones de navegación
    const volverPage = () => navigate('/personal-salud');

    const handleViewChange = (view) => {
        setActiveView(activeView === view ? null : view);
        setSelectManzana(null);
        setSearchTerm("");
    };

    useEffect(() => {
        if (selectManzana) {
            setActiveView("datamz");
        }
    }, [selectManzana]);

    // Componentes de vistas
    const renderView = () => {
        switch (activeView) {
            case "config":
                return (
                    <div className="boxs">
                        <Config />
                    </div>
                );
            case "datamz":
                return (
                    <div className="boxs">
                        {selectManzana ? (
                            <>
                                <FormSector manzana={selectManzana} />
                                <NotasManzana manzana={selectManzana} />
                                <Familias />
                            </>
                        ) : (
                            <p style={{ textAlign: 'center' }}>Selecciona una manzana</p>
                        )}
                    </div>
                );
            case "person":
                return (
                    <div className="boxs">
                        <div className="search">
                            <p>PERSONALES DE SALUD</p>
                            <input
                                type="text"
                                placeholder="Buscar por nombre, dni..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MdOutlineManageSearch className="ico-search" />
                        </div>
                        <TablaForSector data={personalSalud} searchTerm={searchTerm} />
                    </div>
                );
            case "list":
                return (
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
                );
            default:
                return null;
        }
    };

    return (
        <div className="sector">
            <h3>Mapa del Centro de Salud Micaela Bastidas</h3>
            <div className="ev">
                <div className="menus">
                    <div onClick={() => handleViewChange("config")}>
                        <PiGearBold className={`icon ${activeView === "config" ? "active" : ""}`} />
                        <p className="etiqueta">Configuración</p>
                    </div>
                    <div onClick={() => handleViewChange("datamz")}>
                        <TbMapPinCog className={`icon ${activeView === "datamz" ? "active" : ""}`} />
                        <p className="etiqueta">Datos de Manzana</p>
                    </div>
                    <div onClick={() => handleViewChange("person")}>
                        <PiUsersBold className={`icon ${activeView === "person" ? "active" : ""}`} />
                        <p className="etiqueta">Personales de Salud</p>
                    </div>
                    <div onClick={() => handleViewChange("list")}>
                        <TbListCheck className={`icon ${activeView === "list" ? "active" : ""}`} />
                        <p className="etiqueta">Profesionales con Sector</p>
                    </div>
                    <div onClick={volverPage}>
                        <RiLogoutCircleLine className="icon" />
                        <p className="etiqueta">Salir</p>
                    </div>
                    <div onClick={() => setViewDataMap(!viewDataMap)} className={`mapIco ${viewDataMap ? 'active' : ''}`} style={{ bottom: '50px' }}>
                        <MdOutlineViewInAr className="icon" />
                        <p className="etiqueta">Ver Datos</p>
                    </div>
                    <div className="mapIco">
                        <GrMapLocation className="map" />
                        <span>SAIS</span>
                    </div>
                </div>
                <section className={`nodatas ${activeView ? "datass" : ""}`}>
                    {renderView()}
                </section>
                <main className="mapa-box">
                    <h3 className={`h4 ${viewDataMap ? '' : 'noView'}`}>
                        PLANO DE LA JURISDICCION DEL EESS <br />
                        CENTRO DE SALUD MICAELA BASTIDA
                    </h3>
                    <div className={`legend ${viewDataMap ? '' : 'noView'}`}>
                        <h4>Leyenda</h4>
                        <h5>Categorias</h5>
                        <p><RiPuzzleFill style={{ color: colors.deporte }} />Deporte</p>
                        <p><RiPuzzleFill style={{ color: colors.educacion }} />Educación</p>
                        <p><RiPuzzleFill style={{ color: colors.espacimiento }} />Esparcimiento</p>
                        <p><RiPuzzleFill style={{ color: colors.estado }} />Estado</p>
                        <p><RiPuzzleFill style={{ color: colors.iglesia }} />Iglesia</p>
                        <p><RiPuzzleFill style={{ color: colors.industria }} />Industria</p>
                        <p><RiPuzzleFill style={{ color: colors.mercado }} />Mercado</p>
                        <p><RiPuzzleFill style={{ color: colors.salud }} />Salud</p>
                        <p><RiPuzzleFill style={{ color: colors.viviendas }} />Viviendas</p>
                        <p><MdTsunami style={{ color: colors.hidrografia }} />Hidrografía</p>
                        <p><FaRoad style={{ color: colors.calles }} />Vias_Final</p>
                        <p><span style={{ backgroundColor: colors.mz2021 }} />Manzanas_2021</p>
                    </div>
                    <img className={`img1 ${viewDataMap ? '' : 'noView'}`} src={mbba_b} alt="" />
                    <img className={`img2 ${viewDataMap ? '' : 'noView'}`} src={puntoCar} alt="" />
                    <Minimap viewDataMap={viewDataMap} />
                    <Mapa selectManzana={selectManzana} setSelectManzana={setSelectManzana} />
                </main>
            </div>
        </div>
    );
};

export default Sectores;
