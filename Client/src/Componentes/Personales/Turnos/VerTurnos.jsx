import React, { useState } from "react";
import { useEffect } from "react";
import './turnos.css';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { MdPersonSearch } from 'react-icons/md';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Informacion from '../infoTurno/Informacion'

const AsignaTurno = ({ closeTurnos }) => {
    const [personales, setPersonales] = useState([]);
    const [turnos, setTurnos] = useState({});
    const [mesActual, setMesActual] = useState(new Date());
    const [cargando, setCargando] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtroCondicion, setFiltroCondicion] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');
    const [personalSeleccionado, setPersonalSeleccionado] = useState(null);  // ESTADO PARA GUARDAR EL PERSONAL SELECCIONADO
    const [modalAbierto, setModalAbierto] = useState(false);  // ESTADO PARA CONTROLAR EL MODAL
    const filasPorPagina = 10;
    const [tiposDeTurno, setTiposDeTurno] = useState([]);

    useEffect(() => {
        const fetchPersonales = async () => {
            setCargando(true);
            try {
                const response = await fetch('http://localhost:5000/api/obtener/personal-salud');
                const data = await response.json();
                setPersonales(data);
            } catch (error) {
                console.error('Error al obtener los personales de salud:', error);
            } finally {
                setCargando(false);
            }
        };

        const fetchTurnos = async () => {
            const mes = mesActual.getMonth() + 1;
            const anio = mesActual.getFullYear();
            try {
                setCargando(true);
                const response = await fetch(`http://localhost:5000/api/turnos/${anio}/${mes}`);
                const data = await response.json();

                const turnosMap = {};
                data.forEach(turno => {
                    const fechaSinHora = new Date(turno.fecha).toISOString().split('T')[0];
                    if (!turnosMap[turno.id_personal]) {
                        turnosMap[turno.id_personal] = {};
                    }
                    turnosMap[turno.id_personal][fechaSinHora] = turno.clave_turno;
                });

                setTurnos(turnosMap);
            } catch (error) {
                console.error('Error al obtener los turnos:', error);
            } finally {
                setCargando(false);
            }
        };

        fetchPersonales();
        fetchTurnos();
    }, [mesActual]);

    useEffect(() => {
        const fetchTiposDeTurno = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tipos-turno');
                const data = await response.json();
                setTiposDeTurno(data);
            } catch (error) {
                console.error('Error al obtener los tipos de turnos:', error);
            }
        };

        fetchTiposDeTurno();
    }, []);

    const obtenerFechasDelMes = (mes, anio) => {
        const fechas = [];
        const diasEnMes = new Date(anio, mes, 0).getDate();
        for (let i = 1; i <= diasEnMes; i++) {
            const fecha = new Date(anio, mes - 1, i);
            fechas.push(fecha);
        }
        return fechas;
    };

    const fechasDelMes = obtenerFechasDelMes(mesActual.getMonth() + 1, mesActual.getFullYear());

    const manejarMesSiguiente = () => {
        const siguienteMes = new Date(mesActual);
        siguienteMes.setMonth(mesActual.getMonth() + 1);
        setMesActual(siguienteMes);
    };

    const manejarMesAnterior = () => {
        const mesAnterior = new Date(mesActual);
        mesAnterior.setMonth(mesActual.getMonth() - 1);
        setMesActual(mesAnterior);
    };

    const personalesFiltrados = personales.filter(personal => {
        const coincideBusqueda = `${personal.paterno} ${personal.materno} ${personal.nombres}`.toLowerCase().includes(busqueda.toLowerCase()) ||
            personal.dni.includes(busqueda);
        const coincideCondicion = filtroCondicion === 'Todos' || personal.condicion === filtroCondicion;
        return coincideBusqueda && coincideCondicion;
    });

    const activosFiltrados = personalesFiltrados.filter(personal => personal.estado === 'activo');

    const indiceFinal = paginaActual * filasPorPagina;
    const indiceInicial = indiceFinal - filasPorPagina;
    const personalesPaginados = activosFiltrados.slice(indiceInicial, indiceFinal);

    const manejarVerMas = () => {
        if (indiceFinal < activosFiltrados.length) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const manejarVerMenos = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    // Función para manejar el clic en el nombre del personal
    const manejarClickPersonal = (personal) => {
        setPersonalSeleccionado(personal);
        setModalAbierto(true);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setModalAbierto(false);
        setPersonalSeleccionado(null);
    };

    return (
        <div className="turnos-personal">
            <main>
                <h3>TABLA DE TURNOS DE PERSONAL</h3>
                <section>
                    <div className="acciones">
                        <Link onClick={closeTurnos} className='volver_link'>
                            <RiPlayReverseLargeFill /> VOLVER
                        </Link>
                        <MdPersonSearch className='ico_buscar' />
                        <input
                            className='buscar-personal'
                            placeholder="Buscar por nombre, apellidos o DNI"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <div className="filtros">
                            <p><MdMenuOpen className='ico' />CONDICION</p>
                            <div className="filtro">
                                <span onClick={() => setFiltroCondicion('Todos')}>Todos</span>
                                <span onClick={() => setFiltroCondicion('Contratados')}>Contratados</span>
                                <span onClick={() => setFiltroCondicion('Nombrado')}>Nombrado</span>
                                <span onClick={() => setFiltroCondicion('Tercero')}>Tercero</span>
                                <span onClick={() => setFiltroCondicion('CAS')}>CAS</span>
                                <span onClick={() => setFiltroCondicion('CLAS')}>CLAS</span>
                                <span onClick={() => setFiltroCondicion('Serums')}>Serums</span>
                            </div>
                        </div>
                        <span className="contador">{filtroCondicion}: {activosFiltrados.length}</span>
                        <div className="filtros">
                            <p><MdMenuOpen className='ico' />SERVICIO</p>
                            <div className="filtro">
                                <span>Todos</span>
                                <span>Medicina</span>
                                <span>Enfermería</span>
                                <span>Psicología</span>
                                <span>Obstetricia</span>
                                <span>Odontología</span>
                                <span>Nutrición</span>
                                <span>Laboratorio</span>
                                <span>Técnicos/Auxiliares</span>
                            </div>
                        </div>
                        <div className="fecha-cambiar">
                            <h4>{mesActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h4>
                            <button type="button" onClick={manejarMesAnterior}><MdNavigateBefore className="ico-cambiar" />Mes Anterior</button>
                            <button type="button" onClick={manejarMesSiguiente}>Mes Siguiente <MdNavigateNext className="ico-cambiar" /></button>
                        </div>
                    </div>
                    {cargando ? (
                        <p>Cargando datos...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th className="cab">Personal</th>
                                    {fechasDelMes.map((fecha, index) => {
                                        const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
                                        const numeroDia = fecha.getDate();
                                        const esDomingo = fecha.getDay() === 0;

                                        // Obtener la fecha actual sin la parte de la hora
                                        const hoy = new Date();
                                        const esHoy = fecha.toDateString() === hoy.toDateString();  // Comparación de fechas

                                        return (
                                            <th
                                                key={index}
                                                className={`${esDomingo ? 'domingo' : ''} ${esHoy ? 'hoy' : ''}`}  // Agregar clase 'hoy' si es la fecha actual
                                            >
                                                {diaSemana.charAt(0).toUpperCase()}-{numeroDia}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {personalesPaginados.map((personal, index) => (
                                    <tr key={personal.id_personal}>
                                        <td style={{ textAlign: 'center' }}>{indiceInicial + index + 1}</td>
                                        <td className="names" onClick={() => manejarClickPersonal(personal)}>
                                            {`${personal.paterno} ${personal.materno} ${personal.nombres}`}
                                            {modalAbierto && (
                                                <Informacion personal={personalSeleccionado} cerrarModal={cerrarModal} />
                                            )}
                                        </td>
                                        {fechasDelMes.map(fecha => {
                                            return (
                                                <td style={{ textAlign: 'center' }} key={fecha} className={fecha.getDay() === 0 ? 'domingo' : ''}>
                                                    {fecha.getDay() !== 0 && (
                                                        <select>
                                                            <option value=""></option>
                                                            {tiposDeTurno.map(turnos => (
                                                                <option value={turnos.clave_turno}>{turnos.clave_turno} </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="btns">
                        <button>GUARDAR CAMBIOS</button>
                        <button>RESTABLECER DATOS</button>
                    </div>
                </section>
                <div className="btn-paginacion">
                    <button onClick={manejarVerMenos} disabled={paginaActual === 1}>Ver menos</button>
                    <button onClick={manejarVerMas} disabled={indiceFinal >= activosFiltrados.length}>Ver más</button>
                </div>
            </main>
        </div>
    );
};

export default AsignaTurno;