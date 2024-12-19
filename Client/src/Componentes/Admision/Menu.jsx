import React, { useState } from 'react'
import { MdDateRange } from "react-icons/md";
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { LuLink } from "react-icons/lu";

const Menu = () => {
    const [acredita, setAcredi] = useState(false)

    const handleAcredit = () => {
        setAcredi(!acredita)
    }

    return (
        <div className="menu-admision">
            <Link className="box" to='/panel-cita'>
                <h5><MdDateRange className='icom' /> Citas</h5>
                <p>Otorga Citas</p>
            </Link>
            <div onClick={handleAcredit} className="box" style={{ position: 'relative' }} >
                <h5><IoCheckmarkDoneOutline className="icom" /> Acreditación</h5>
                <p>Verifica Afiliación</p>
                <div className={`noacredita ${acredita ? 'acredita' : ''}`}>
                    <h4>Elige una opción</h4>
                    <div className="links">
                        <div className="flecha"></div>
                        <a href='http://app3.sis.gob.pe/SisConsultaEnLinea/Consulta/frmConsultaEnLinea.aspx' target="_blank" rel="noopener noreferrer">
                            <LuLink className='ico' />
                            Ir a SIS
                        </a>
                        <a href='https://app8.susalud.gob.pe:8380/login' target="_blank" rel="noopener noreferrer">
                            <LuLink className='ico' />
                            Ir a SITEDS
                        </a>
                    </div>
                    <button onClick={handleAcredit} className="btn-cancela">Cerrar</button>
                </div>
            </div>
        </div>
    )
}

export default Menu