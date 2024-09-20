import React from 'react'
import { IoDocumentText } from "react-icons/io5";
import { MdPermContactCalendar } from "react-icons/md";
import { Link } from 'react-router-dom';


const NavPie = () => {

  return (
    <div className="nav_pie">
      <div>
        <p>Copyrigth Derechos Reservados-2024  by Nixon ,Erick,Alejandro</p>
      </div>
      <div className='btns'>
        <button href="www.hola.com"><IoDocumentText /> Documentación</button>
        <Link to="/contact-administrador" className='button'> <MdPermContactCalendar />Contact Admin</Link>
      </div>
    </div>
  )
}

export default NavPie;