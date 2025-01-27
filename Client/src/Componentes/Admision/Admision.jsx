import './admision.css';
import React from 'react';
import { Link } from 'react-router-dom';
import NavLogin from '../Navegadores/NavLogin';
import NavPie from '../Navegadores/NavPie';
import Buscar from './Buscar';
import niño from '../Ico/baby.png';
import adolescente from '../Ico/adolescente.png';
import joven from '../Ico/joven.png';
import adulto from '../Ico/adulto.png';
import adultoMayor from '../Ico/adultoMayor.png';
import gestante from '../Ico/gestante.png';
import EstadoSesion from '../Complementos/EstadoSesion';

const volver = () => {
    window.location.href = '/'
}

const Panel = () => {

    const { isLoggedIn } = EstadoSesion()
    return (
        <div className="admision">
            {isLoggedIn ? (
                <>
                    <NavLogin />
                    <div className="opciones">
                        <p>Paquete de atención integral por curso de vida </p>
                        <Link className="box" to='/servicios-niño'>
                            <img src={niño} alt="" />
                            <p>Niño</p>
                            <p className="edad">0 - 11 años</p>
                        </Link>
                        <Link className="box" to='/panel-adolescente'>
                            <img src={adolescente} alt='' />
                            <p>Adolescente</p>
                            <p className="edad">12 - 17 años</p>
                        </Link>
                        <Link className="box" to='/panel-joven'>
                            <img src={joven} alt='' />
                            <p>Joven</p>
                            <p className="edad">18 - 29 años</p>
                        </Link>
                        <Link className="box" to='/panel-adulto'>
                            <img src={adulto} alt='' />
                            <p>Adulto</p>
                            <p className="edad">30 - 59 años</p>
                        </Link>
                        <Link className="box" to='/panel-adultomayor'>
                            <img src={adultoMayor} alt='' />
                            <p>Adulto Mayor</p>
                            <p className="edad">60 a más</p>
                        </Link>
                        <Link className="box" to='/gestante'>
                            <img src={gestante} alt='' />
                            <p>Gestante</p>
                        </Link>
                    </div>
                    <main className="main-admi">
                        <Buscar />
                    </main>
                    <NavPie />
                </>
            ) : (
                <div>
                    <p> INICIAR SESION </p>
                    <button onClick={volver}>INCIAR SESION</button>
                </div>
            )}

        </div>
    );
}

export default Panel;