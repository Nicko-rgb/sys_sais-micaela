import React, { useState, useEffect } from "react";
import "./sector.css";
import { PiGearBold, PiUsersBold } from "react-icons/pi";
import { TbListCheck, TbMapPinCog } from "react-icons/tb";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineManageSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Store from "../../Store/Store_Cita_Turno";
import Mapa from "./Mapa";
import { TablaForSector } from "../infoTurno/MiniCompont";
import FormSector from "./FormSector";

const Sectores = ({ personData }) => {
    const navigate = useNavigate();
    const { personalSalud, sectorPer } = Store();

    // Estados
    const [activeView, setActiveView] = useState(null); // Maneja las vistas activas
    const [selectManzana, setSelectManzana] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Funciones de navegación
    const volverPage = () => navigate('/personal-salud');

    const handleViewChange = (view) => {
        setActiveView(activeView === view ? null : view); // Activa o desactiva la vista seleccionada
        setSelectManzana(null); // Reinicia la manzana seleccionada
        setSearchTerm(""); // Limpia el término de búsqueda
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
                        <h3>Configuración</h3>
                        <button>Eliminar</button>
                        <button>Guardar</button>
                        <button>Cerrar</button>
                        <button>Enviar</button>
                    </div>
                );
            case "datamz":
                return (
                    <div className="boxs bform">
                        {selectManzana ? (
                            <>
                                <FormSector manzana={selectManzana} closeForm={() => setSelectManzana(null)} />
                                <h4 style={{marginTop: '20px'}}>Familias en esta manzana</h4>
                                <li>{`Familia de codigo => 0B32S0`}</li>
                                <li>{`Familia de codigo => 0B32S0`}</li>
                                <li>{`Familia de codigo => 0B32S0`}</li>
                                <li>{`Familia de codigo => 0B32S0`}</li>
                            </>
                        ) : (
                            <p>Selecciona una manzana</p>
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
            <h3>Mapa del Centro de Salud Micaela Bastidas - SAIS {personData?.nombres || "----"}</h3>
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
                    <div className="map-ico">
                        <GrMapLocation className="map" />
                        <span>SAIS</span>
                    </div>
                </div>
                <section className={`nodatas ${activeView ? "datass" : ""}`}>
                    {renderView()}
                </section>
                <main className="content">
                    <Mapa selectManzana={selectManzana} setSelectManzana={setSelectManzana} />
                </main>
            </div>
        </div>
    );
};

export default Sectores;
