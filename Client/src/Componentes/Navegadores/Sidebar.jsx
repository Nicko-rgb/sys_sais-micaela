import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUserMinus, FaChartBar } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { RiTeamLine, RiTaskLine } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { BsListTask, BsCalendarCheck } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import "./sidebar.css"

const Sidebar = ({ tipoUser }) => {
  const renderMenuItems = () => {
    switch (tipoUser) {
      case 'Admin':
        return (
          <>
            <li><Link to="/admin/usuarios"><MdManageAccounts /> Gestionar Usuarios</Link></li>
            <li><Link to="/admin/agregar"><FaUserPlus /> Agregar Personal</Link></li>
            <li><Link to="/admin/eliminar"><FaUserMinus /> Eliminar Usuario</Link></li> 
            <li><Link to="/admin/eliminar"><FaUserMinus /> Ver Inventario</Link></li> 
            <li><Link to="/admin/eliminar"><FaUserMinus /> Generar Reportes</Link></li> 
            <li><Link to="/admin/eliminar"><FaUserMinus /> Eliminar Usuario</Link></li> 
          </>
        );
      case 'Jefe':
        return (
          <>
            <li><Link to="/jefe/equipo"><RiTeamLine /> Ver Equipo</Link></li>
            <li><Link to="/jefe/asignar-tareas"><RiTaskLine /> Asignar Tareas</Link></li>
            <li><Link to="/jefe/rendimiento"><GiProgression /> Rendimiento del Equipo</Link></li>
          </>
        );
      case 'Responsable':
        return (
          <>
            <li><Link to="/personal/tareas"><BsListTask />Tareas XXX</Link></li>
            <li><Link to="/personal/solicitudes"><AiOutlineForm /> Solicitudes</Link></li>
            <li><Link to="/personal/horario"><BsCalendarCheck /> Mi Horario</Link></li>
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