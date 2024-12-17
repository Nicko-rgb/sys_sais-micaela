import React, { useState, useEffect } from "react";
import './turnos.css';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdMenuOpen, MdPersonSearch, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Informacion from '../infoTurno/Informacion';
import { AiOutlineExport } from "react-icons/ai";
import Store from "../../Store/Store_Cita_Turno";
import CuerpoTabla from "./CuerpoTabla";
import { LeyendasTurno } from "../infoTurno/MiniCompont";
import EstadoSesion from "../../Complementos/EstadoSesion";

const AsignaTurno = ({ closeTurnos }) => {
    const { tiposDeTurno, profesiones } = Store()
    const [personales, setPersonales] = useState([]);
    const [mesActual, setMesActual] = useState(new Date());
    const [cargando, setCargando] = useState(true);
    const [filtroCondicion, setFiltroCondicion] = useState('Todos');
    const [condicionFiltro, setCondiconFiltro] = useState([])
    const [checkCitas, setCheckCitas] = useState(false)
    const [busqueda, setBusqueda] = useState('');
    const [personalSeleccionado, setPersonalSeleccionado] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [columnasBloqueadas, setColumnasBloqueadas] = useState([]); // Cambiar a un arreglo de fechas bloqueadas
    const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
    const [turnos, setTurnos] = useState([]);
    const { tipoUser } = EstadoSesion()

    useEffect(() => {
        const fetchPersonales = async () => {
            setCargando(true);
            try {
                const response = await fetch('http://localhost:5000/api/obtener/personal-salud');
                const data = await response.json();
                setPersonales(data);
                //filtrar tipo e condicion unicos
                const condicionUnicos = Array.from(new Set(data.map(personal => personal.condicion)));
                setCondiconFiltro(condicionUnicos);
            } catch (error) {
                console.error('Error al obtener los personales de salud:', error);
            } finally {
                setCargando(false);
            }
        };
        fetchPersonales();
    }, [mesActual]);


    useEffect(() => {
        const fetchTurnosPersonal = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/obtener-turnos/personal');
                const data = await response.json();
                setTurnos(data);
            } catch (error) {
                console.error('Error al obtener los tipos de turnos:', error);
            }
        };
        fetchTurnosPersonal();
    }, []);

    useEffect(() => {
        const fetchFechasBloqueadas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/obtener-fechas-bloqueadas');
                const data = await response.json();
                // Convertir las fechas a formato de string para comparar correctamente
                const fechasBloqueadas = data.map(f => new Date(f.fecha).toDateString());
                setColumnasBloqueadas(fechasBloqueadas);
            } catch (error) {
                console.error('Error al obtener las fechas bloqueadas:', error);
            }
        };
        fetchFechasBloqueadas();
    }, []);

    const obtenerFechasDelMes = (fecha) => {
        const anio = fecha.getFullYear();
        const mes = fecha.getMonth();
        const primerDia = new Date(anio, mes, 1);
        const ultimoDia = new Date(anio, mes + 1, 0);
        const fechas = [];

        for (let dia = new Date(primerDia); dia <= ultimoDia; dia.setDate(dia.getDate() + 1)) {
            fechas.push(new Date(dia));
        }
        return fechas;
    };

    const fechasDelMes = obtenerFechasDelMes(mesActual);

    const manejarMesSiguiente = () => {
        setMesActual(prevMes => {
            const nuevoMes = new Date(prevMes);
            nuevoMes.setMonth(nuevoMes.getMonth() + 1);
            return nuevoMes;
        });
    };

    const manejarMesAnterior = () => {
        setMesActual(prevMes => {
            const nuevoMes = new Date(prevMes);
            nuevoMes.setMonth(nuevoMes.getMonth() - 1);
            return nuevoMes;
        });
    };

    const personalesFiltrados = personales.filter(personal => {
        const coincideBusqueda = `${personal.paterno} ${personal.materno} ${personal.nombres}`.toLowerCase().includes(busqueda.toLowerCase()) ||
            personal.dni.includes(busqueda);
        const coincideCondicion = filtroCondicion === 'Todos' || personal.condicion === filtroCondicion || personal.profesion === filtroCondicion;
        const personalCitado = checkCitas ? personal.especial_cita : true;
        return coincideBusqueda && coincideCondicion && personalCitado && coincideBusqueda;
    });

    const activosFiltrados = personalesFiltrados.filter(personal => personal.estado === 'activo');

    const manejarClickPersonal = (personal, event) => {
        const { top, right } = event.currentTarget.getBoundingClientRect();
        setPersonalSeleccionado(personal);
        setModalAbierto(true);
        setColumnaSeleccionada(null)
        setModalPosicion({ top: top + window.scrollY, left: right }); // Posiciona a la derecha
    };

    // Añade un estado para la posición del modal
    const [modalPosicion, setModalPosicion] = useState({ top: 0, left: 0 });

    const cerrarModal = () => {
        setModalAbierto(false);
        setPersonalSeleccionado(null);
    };

    const manejarBloqueoColumna = async (fecha) => {
        try {
            // Convertir la fecha al formato YYYY-MM-DD para MySQL
            const fechaFormateada = new Date(fecha).toISOString().split('T')[0];

            if (columnasBloqueadas.includes(fecha)) {
                // Si la fecha está bloqueada, envía una solicitud para desbloquearla
                await fetch(`http://localhost:5000/api/desbloquear-fecha`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fecha: fechaFormateada }),  // Usar la fecha formateada
                });
                // Desbloquear localmente
                setColumnasBloqueadas(prev => prev.filter(columna => columna !== fecha));
            } else {
                // Si la fecha no está bloqueada, envía una solicitud para bloquearla
                await fetch(`http://localhost:5000/api/bloquear-fecha`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fecha: fechaFormateada }),  // Usar la fecha formateada
                });
                // Bloquear localmente
                setColumnasBloqueadas(prev => [...prev, fecha]);
            }
        } catch (error) {
            console.error('Error al bloquear/desbloquear la fecha:', error);
        }
        setColumnaSeleccionada(null); // Cerrar el botón de bloquear después de hacer clic
    };

    const manejarSeleccionColumna = (fecha) => {
        if (columnaSeleccionada === fecha) {
            setColumnaSeleccionada(null);
        } else {
            setModalAbierto(false)
            setColumnaSeleccionada(fecha); // Selecciona la columna actual
        }
    };
    // Enviar los turnos al servidor para guardar
    const manejarGuardarTurno = async (id_personal, id_turno_tipo, fecha) => {
        try {
            const response = await fetch('http://localhost:5000/api/asignar-turno/personal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_personal, id_turno_tipo, fecha })
            });
            await response.json();

        } catch (error) {
            console.error('Error al guardar el turno:', error);
        }
    };
    // Restablecer turnos
    const manejarRestablecerTurnos = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/obtener-turnos/personal', {
                method: 'GET'
            });
            const data = await response.json();
            const turnosIniciales = {};
            data.forEach(({ id_personal, fecha, id_turno_tipo }) => {
                turnosIniciales[`${id_personal}_${new Date(fecha).toDateString()}`] = id_turno_tipo;
            });
            setTurnos(turnosIniciales);
        } catch (error) {
            console.error('Error al restablecer los turnos:', error);
        }
    };
    manejarRestablecerTurnos()

    const obtenerClaveTurno = (id_turno_tipo) => {
        const turno = tiposDeTurno.find(t => t.id_turno_tipo === id_turno_tipo);
        return turno ? turno.clave_turno : '';
    };

    const handleCheckCita = () => {
        setCheckCitas(!checkCitas)
    }

    return (
        <div className="turnos-personal">
            <main>
                <h3>TABLA DE TURNOS DE PERSONAL</h3>
                <section>
                    <div className="acciones">
                        <Link onClick={closeTurnos} className='volver_link'>
                            <RiPlayReverseLargeFill /> VOLVER
                        </Link>
                        <input
                            className='buscar-personal'
                            placeholder="Buscar por nombre, apellidos o DNI"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <MdPersonSearch className='ico_buscar' />
                        <div className="filtros">
                            <button className="btn-filtro" style={{ width: '120px' }}><MdMenuOpen className='ico' />Condición</button>
                            <div className="filtro">
                                <span onClick={() => setFiltroCondicion('Todos')}>TODOS</span>
                                {condicionFiltro.map((condicion, index) => (
                                    <span key={index} onClick={() => setFiltroCondicion(condicion)} >{condicion}</span>
                                ))}
                            </div>
                        </div>
                        <div className="filtros">
                            <button className="btn-filtro" style={{ width: '120px' }}><MdMenuOpen className='ico' />Profesión</button>
                            <div className="filtro">
                                <span onClick={() => setFiltroCondicion('Todos')}>TODOS</span>
                                {profesiones.map((profesion, index) => (
                                    <span key={index} onClick={() => setFiltroCondicion(profesion.nombre_profesion)} >{profesion.nombre_profesion}</span>
                                ))}
                            </div>
                        </div>
                        <label onClick={handleCheckCita} htmlFor="chec" class="switch">
                            <input checked={checkCitas} name="chec" type="checkbox" />
                            <span class="slider"></span>
                            <p>Con Citas</p>
                        </label>
                        <div className="fecha-cambiar">
                            <button type="button" onClick={manejarMesAnterior}><MdNavigateBefore className="ico-cambiar" />Mes Anterior</button>
                            <button type="button" onClick={manejarMesSiguiente}>Mes Siguiente <MdNavigateNext className="ico-cambiar" /></button>
                        </div>
                    </div>
                    <div className="inf">
                        <p>{mesActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</p>
                        <p className="contador"> {filtroCondicion}: {activosFiltrados.length} de {personales.length} </p>
                    </div>
                    {cargando ? (
                        <p>Cargando datos...</p>
                    ) : (
                        <div className="tbl">
                            <table>
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th className="cab">Personal</th>
                                        {fechasDelMes.map((fecha, index) => {
                                            const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
                                            const numeroDia = fecha.getDate();
                                            const esDomingo = fecha.getDay() === 0;
                                            const esHoy = fecha.toDateString() === new Date().toDateString();

                                            const columnaBloqueada = columnasBloqueadas.includes(fecha.toDateString());

                                            return (
                                                <th
                                                    key={index}
                                                    className={`${esDomingo ? 'domingo' : ''} ${esHoy ? 'hoy' : ''} ${columnaBloqueada ? 'bloqueada' : ''}`}
                                                    onClick={() => manejarSeleccionColumna(fecha.toDateString())} // Usar la fecha como clave
                                                >
                                                    {diaSemana.charAt(0).toUpperCase()}-{numeroDia}
                                                    {columnaSeleccionada === fecha.toDateString() && (
                                                        tipoUser.toLowerCase() !== 'responsable' && (
                                                            <div className="accion-cabeza">
                                                                <div className="balloon">
                                                                    <p>ACCIONES</p>
                                                                    <button onClick={() => manejarBloqueoColumna(fecha.toDateString())}>
                                                                        {columnaBloqueada ? 'Desbloquear' : 'Bloquear'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <CuerpoTabla
                                    activosFiltrados={activosFiltrados}
                                    fechasDelMes={fechasDelMes}
                                    tiposDeTurno={tiposDeTurno}
                                    obtenerClaveTurno={obtenerClaveTurno}
                                    turnos={turnos}
                                    manejarClickPersonal={manejarClickPersonal}
                                    columnasBloqueadas={columnasBloqueadas}
                                    manejarGuardarTurno={manejarGuardarTurno}
                                />
                            </table>
                            <Link className="btn-export" to='/exportar-turno'><AiOutlineExport className="icoExport" />Exportar</Link>
                        </div>
                    )}
                    <LeyendasTurno tiposDeTurno={tiposDeTurno} />
                </section>
            </main>
            {modalAbierto && personalSeleccionado && (
                <div style={{
                    position: 'absolute',
                    top: modalPosicion.top,
                    left: modalPosicion.left,
                    transform: 'translate(0, 0)',
                }}>
                    <Informacion
                        personals={personalSeleccionado}
                        cerrarModal={cerrarModal}
                    />
                </div>
            )}
        </div>
    );
};

export default AsignaTurno;