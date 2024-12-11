import React, { useState, useEffect } from 'react';
import { FaUsersCog, FaTimes, FaUser } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import EstadoSesion from '../Complementos/EstadoSesion';
import Sidebar from './Sidebar';
import './nav.css'
import Modalnavtop from './modalnavtop';

const NavTop = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
  const { handleLogout, isLoggedIn, rutaPerfil, tipoUser } = EstadoSesion();
  const { userPersonal } = EstadoSesion();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const RecargarPagina = () => {
    window.location.reload();
  };

  // Función para abrir el modal de cierre de sesión
  const openLogoutModal = () => {
    setModalOpen(true);
  };

  // Función para manejar la confirmación del cierre de sesión
  const closeSesion = () => {
    handleLogout();
    setModalOpen(false); // Cerrar el modal
    window.location.href = '/';
  };

  const closeModal = () => {
    setModalOpen(false); // Cerrar el modal sin realizar acciones
  };

  const openPersonal = () => {
    window.location.href = '/personal-salud';
  };

  const RutaPerfil = () => {
    window.location.href = rutaPerfil;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  return (
    <div className="nav-top">
      <div className='recargar' onClick={RecargarPagina}>
        <FaUsersCog className='iconn icon1' />
        <p>Sistema de Atención Integral de Salud - C.S. MICAELA BASTIDAS</p>
      </div>
      <div className="menu-nav">
        {isLoggedIn && (
          <>
            {userPersonal}
            <div className="reloj" style={{ color: 'white', marginLeft: '10px', fontSize: "12px" }}>
              {formatTime(currentTime)}
            </div>
            <IoPeopleSharp className='iconn ico-people' onClick={openPersonal} title='USERS PERSONAL' />
            <FaUser className='iconn ico-yo-user' onClick={RutaPerfil} title='PERFIL USUARIO' />
            <BiLogOutCircle className='iconn ico-closse-sesion' onClick={openLogoutModal} title='CERRAR SESION' />
            <FaBarsStaggered className='iconn icon_login_nav' onClick={toggleSidebar} />
          </>
        )}
      </div>
      <Sidebar tipoUser={tipoUser} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {modalOpen && (
        <Modalnavtop
          onClose={closeModal}
          onConfirm={closeSesion}
        />
      )}
    </div>
  );
};

export default NavTop;
