import React, { useState } from 'react';
import { FaUsersCog, FaTimes, FaUser } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import EstadoSesion from '../Complementos/EstadoSesion';
import Sidebar from './Sidebar';
import '../Login/login.css';


const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { handleLogout, isLoggedIn, rutaPerfil, tipoUser } = EstadoSesion();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const RecargarPagina = () => {
    window.location.reload();
  };

  const closeSesion = () => {
    handleLogout();
    setSidebarOpen(false); // Cierra la barra lateral al cerrar sesión
    window.location.href = '/';
  };

  const openPersonal = () => {
    window.location.href = '/personal-salud';
  };

  const RutaPerfil = () => {
    window.location.href = rutaPerfil;
  };

  const ocultarMenuAgregarUsrer=()=>{
      if (tipoUser=="Admin"){
        <Sidebar tipoUser={tipoUser}></Sidebar>

      }
      else{
         
      }
  }

  return (
    <div className="app-layout">
      <div className="nav_login" style={{ position: 'fixed' }}>
        <div className='recargar' onClick={RecargarPagina}>
          <FaUsersCog className='icon icon1' />
          <p>Sistema de Atención Integral de Salud - C.S. MICAELA BASTIDAS</p>
        </div>
        <div className="opcion-nav">
          {isLoggedIn && (
            <>
              <IoPeopleSharp className='icon ico-people' onClick={openPersonal} title='USERS PERSONAL' />
              <FaUser className='icon ico-yo-user' onClick={RutaPerfil} title='PERFIL USUARIO' />
              <BiLogOutCircle className='icon ico-closse-sesion' onClick={closeSesion} title='CERRAR SESION' />
              <FaBarsStaggered className='icon icon_login_nav' onClick={toggleSidebar} />
            </>
          )}
        </div>
      </div>
      {isLoggedIn && (
        <div className={`sidebarMenu ${sidebarOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <FaTimes className="close-icon" onClick={toggleSidebar} />
          <Sidebar tipoUser={tipoUser} />
        </div>
      )}
      <div className="content-wrapper">
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;