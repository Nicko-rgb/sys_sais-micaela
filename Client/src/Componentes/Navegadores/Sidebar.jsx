import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaChartBar } from "react-icons/fa";
import { MdManageAccounts, MdHistory, MdNotifications } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { GiProgression, GiHealthNormal } from "react-icons/gi";
import { BsListTask, BsCalendarCheck, BsClipboardData } from "react-icons/bs";
import { AiOutlineForm, AiOutlineSetting } from "react-icons/ai";
import { IoStatsChartOutline, IoSettingsSharp } from "react-icons/io5";
import { AiOutlineDashboard } from 'react-icons/ai';
import "./sidebar.css";

const Sidebar = ({ tipoUser }) => {
  const renderMenuItems = () => {
    switch (tipoUser) {
      case 'Admin':
        return (
          <>
            <li><Link to="/panel"><AiOutlineDashboard /> Inicio Panel</Link></li>
            <li><Link to="/personal-salud"><FaUserPlus /> Ver Personal</Link></li>
            <li><Link to="/personal-salud"><FaUserPlus /> Asignar Turnos</Link></li>
            <li><Link to="/admin/reportes"><FaChartBar /> Generar Reportes</Link></li>
            <li><Link to="/admin/gestion-usuarios"><MdManageAccounts /> Gestión de Usuarios</Link></li>
            <li><Link to="/admin/notificaciones"><MdNotifications /> Notificaciones</Link></li>
            <li><Link to="/configuaracion-sistema"><AiOutlineSetting /> Configuración del Sistema</Link></li>
          </>
        );
      case 'Jefe':
        return (
          <>
            <li><Link to="/personal-salud"><RiTeamLine /> Ver Equipo</Link></li>
            <li><Link to="/personal-salud"><FaUserPlus /> Asignar Turnos</Link></li>
            <li><Link to="/jefe/rendimiento"><GiProgression /> Rendimiento del Equipo</Link></li>
            <li><Link to="/jefe/estadisticas"><IoStatsChartOutline /> Estadísticas de Equipo</Link></li>
            <li><Link to="/jefe/historial-tareas"><MdHistory /> Historial de Tareas</Link></li>
            <li><Link to="/jefe/informes"><BsClipboardData /> Informes</Link></li>
          </>
        );
      case 'Responsable':
        return (
          <>
            <li><Link to="/personal/tareas"><BsListTask />Tareas</Link></li>
            <li><Link to="/personal/solicitudes"><AiOutlineForm /> Solicitudes</Link></li>
            <li><Link to="/personal/horario"><BsCalendarCheck /> Mi Horario</Link></li>
            <li><Link to="/personal/historial-clinico"><GiHealthNormal /> Historial Clínico</Link></li>
            <li><Link to="/personal/actualizar-informacion"><MdManageAccounts /> Actualizar Información</Link></li>
            <li><Link to="/personal/configuracion"><IoSettingsSharp /> Configuración Personal</Link></li>
          </>
        );
      default:
        return <li>No hay opciones disponibles</li>;
    }
  };
  return (
    <div className="sidebar-content">
      <h3>{tipoUser}</h3>
      <nav>
        <ul>
          {renderMenuItems()}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
