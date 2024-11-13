import React, { useState, useEffect } from 'react';
import { Link , useParams} from 'react-router-dom';
import './opciones.css';
import { FaBars } from "react-icons/fa";
import { LiaChartBarSolid } from "react-icons/lia";
import { FaGears, FaFileExport, FaUsersGear } from "react-icons/fa6";
import volver from '../Ico/icoVolver.png';
import { BsPersonLinesFill } from "react-icons/bs";
import { MdDateRange, MdOutlineLocationOn, MdGroups2, MdPrint } from "react-icons/md";
import { BiCalendarEdit } from "react-icons/bi";
import { AiOutlineMonitor } from "react-icons/ai";
import { VscGraph } from "react-icons/vsc";
import { GrUpdate } from "react-icons/gr";
import { LuDatabaseBackup } from "react-icons/lu";

const OpcionesD = ( {pacienteDatos, abrirLista} ) => {
    const [activeIcon, setActiveIcon] = useState(0); // 0 para el primer icono, 1 para el segundo, 2 para el tercero
    const [rutaIr, setRutaIr] = useState('');

    const handleIconClick = (index) => {
        setActiveIcon(index);
    };

    // Usar useEffect para establecer la ruta según el tipo de paciente
    useEffect(() => {
        if (pacienteDatos) {
            const tipoPlural = convertirATipoPlural(pacienteDatos.tipo_paciente);
            setRutaIr(tipoPlural.ruta); // Establecer la ruta
        }
    }, [pacienteDatos]); // Solo se ejecuta cuando pacienteDatos cambia

    // Convertir a plural y determinar la ruta
    const convertirATipoPlural = (tipo) => {
        switch (tipo) {
            case 'Niño':
                return { plural: 'Niños', ruta: '-niño' };
            case 'Adolescente':
                return { plural: 'Adolescentes', ruta: '-adolescente' };
            case 'Joven':
                return { plural: 'Jóvenes', ruta: '-joven' };
            case 'Adulto':
                return { plural: 'Adultos', ruta: '-adulto' };
            case 'Adulto Mayor':
                return { plural: 'A. Mayores', ruta: '-mayor' };
            default:
                return { plural: tipo, ruta: '' }; // Devuelve el tipo original si no hay coincidencia
        }
    };

    return (
        <section className="opciones-left" style={{ width: '230px' }}>
            <div className="cabeza">
                <FaBars className={`icons ${activeIcon === 0 ? 'active' : ''}`} onClick={() => handleIconClick(0)} />
                <LiaChartBarSolid className={`icons ${activeIcon === 1 ? 'active' : ''}`} onClick={() => handleIconClick(1)} />
                <FaGears className={`icons ${activeIcon === 2 ? 'active' : ''}`} onClick={() => handleIconClick(2)} />
            </div>
            <div className={`opciones1 ${activeIcon === 0 ? 'show' : 'hide'}`}>
                <Link to={`/panel${rutaIr}`}> <img src={volver} alt="" />INICIO</Link>
                {pacienteDatos && (
                    <Link to={`/list/${pacienteDatos.tipo_paciente}`} onClick={abrirLista}> <BsPersonLinesFill />{convertirATipoPlural(pacienteDatos.tipo_paciente).plural} REGISTRADOS</Link>
                )}
                <Link to="/panel-cita" ><MdDateRange />AGREGAR CITA</Link>
                <p><MdOutlineLocationOn />SECTORES</p>
            </div>
            <div className={`opciones2 ${activeIcon === 1 ? 'show' : 'hide'}`}>
                <Link to="/panel"> <img src={volver} alt="" />INICIO</Link>
                <p><BiCalendarEdit />REGISTRO DIARIO</p>
                <p><AiOutlineMonitor />SEGUIMIENTO Y MONITOREO</p>
                <p><VscGraph />CONSOLIDADO CRED</p> 
                <p>CONSOLIDADO VACUNA</p>
                <p><MdGroups2 />PADRON NOMINAL</p>
                <p><MdPrint />IMPRIMIR HIS</p>
                <p><FaFileExport />EXPORTAR VARIOS</p>
            </div>
            <div className={`opciones3 ${activeIcon === 2 ? 'show' : 'hide'}`}>
                <Link to="/panel"> <img src={volver} alt="" />INICIO</Link>
                <p><FaUsersGear /> USUARIOS DE ACCESO</p>
                <p>PARAMETROS</p>
                <p><GrUpdate />ACTUALIZAR SISTEMA</p>
                <p>CONTROL DE CALIDAD</p>
                <p><LuDatabaseBackup />BACKUP BD</p>
                <p>ESTADO</p>
            </div>
        </section>
    )
}

export default OpcionesD