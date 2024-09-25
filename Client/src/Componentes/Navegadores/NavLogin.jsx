import '../Login/login.css';
import React from 'react';
import { FaUsersCog, FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import EstadoSesion from '../Complementos/EstadoSesion';
import { FaUser } from "react-icons/fa";

const NavLogin = ({ toggleSidebar, sidebarOpen }) => {
    const { handleLogout, isLoggedIn, rutaPerfil } = EstadoSesion()

    const RecargarPagina = () => {
        window.location.reload();
    };

    const closeSesion = () => {
        handleLogout()
        window.location.href = '/'
    }

    const openPersonal = () => {
        window.location.href = '/personal-salud'
    }
    const RutaPerfil = () => {
        window.location.href = rutaPerfil
    }

    return (
        <div className="nav_login" style={{ position: 'fixed' }}>
            <div className='recargar' onClick={RecargarPagina}>
                <FaUsersCog className='icon icon1' />
                <p>Sistema de Atención Integral de Salud - C.S. MICAELA BASTIDAS</p>
            </div>
            <div className="opcion-nav">
                {isLoggedIn && (
                    <>
                        <IoPeopleSharp className='ico-people' onClick={openPersonal} title='USERS PERSONAL' />
                        <FaUser className='ico-yo-user' onClick={RutaPerfil} title='PERFIL USUARIO' />
                        <BiLogOutCircle className='ico-closse-sesion' onClick={closeSesion} title='CERRAR SESION' />
                    </>
                )}
                <FaBarsStaggered className='icon icon_login_nav' onClick={toggleSidebar} />
            </div>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <FaTimes className="close-icon" onClick={toggleSidebar} />
                <p>Contenido de la ventana lateral</p>
            </div>
        </div>
    );
};

export default NavLogin;