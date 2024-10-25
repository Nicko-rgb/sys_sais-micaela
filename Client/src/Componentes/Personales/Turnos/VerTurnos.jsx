import React, { useState, useEffect, useRef } from "react";
import './turnos.css';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { MdMenuOpen, MdPersonSearch, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Informacion from '../infoTurno/Informacion';
import Leyenda from "../infoTurno/Leyendas";

const AsignaTurno = ({ closeTurnos }) => {
    const [personales, setPersonales] = useState([]);
    const [mesActual, setMesActual] = useState(new Date());
    const [cargando, setCargando] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const [filtroCondicion, setFiltroCondicion] = useState('Todos');
    const [profesionFiltro, setProfesionFiltro] = useState([])
    const [condicionFiltro, setCondiconFiltro] = useState([])
    const [busqueda, setBusqueda] = useState('');
    const [personalSeleccionado, setPersonalSeleccionado] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [tiposDeTurno, setTiposDeTurno] = useState([]);
    const [columnasBloqueadas, setColumnasBloqueadas] = useState([]); // Cambiar a un arreglo de fechas bloqueadas
    const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);
    const [turnos, setTurnos] = useState([]); //Para guardar los turnos 
    const tableRef = useRef(null);
    const filasPorPagina = 10;

    useEffect(() => {
        const fetchPersonales = async () => {
            setCargando(true);
            try {
                const response = await fetch('http://localhost:5000/api/obtener/personal-salud');
                const data = await response.json();
                setPersonales(data);

                // Filtrar tipos de profesion unicos
                const preofesionUnicos = Array.from(new Set(data.map(personal => personal.profesion)));
                setProfesionFiltro(preofesionUnicos);
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
        return coincideBusqueda && coincideCondicion;
    });

    const activosFiltrados = personalesFiltrados.filter(personal => personal.estado === 'activo');

    const indiceFinal = paginaActual * filasPorPagina;
    const indiceInicial = indiceFinal - filasPorPagina;
    const personalesPaginados = activosFiltrados.slice(indiceInicial, indiceFinal);

    const manejarVerMas = () => {
        if (indiceFinal < activosFiltrados.length) {
            setPaginaActual(prev => prev + 1);
        }
    };

    const manejarVerMenos = () => {
        if (paginaActual > 1) {
            setPaginaActual(prev => prev - 1);
        }
    };

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
            const data = await response.json();

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
                                <span onClick={() => setFiltroCondicion('Todos')}>TODOS</span>
                                {condicionFiltro.map((condicion, index) => (
                                    <span key={index} onClick={() => setFiltroCondicion(condicion)} >{condicion}</span>
                                ))}
                            </div>
                        </div>
                        <div className="filtros">
                            <p><MdMenuOpen className='ico' />PROFESION</p>
                            <div className="filtro">
                                <span onClick={() => setFiltroCondicion('Todos')}>TODOS</span>
                                {profesionFiltro.map((tipo, index) => (
                                    <span key={index} onClick={() => setFiltroCondicion(tipo)} >{tipo}</span>
                                ))}
                            </div>
                        </div>
                        <span className="contador">{filtroCondicion}: {activosFiltrados.length}</span>
                        <div className="fecha-cambiar">
                            <h4>{mesActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h4>
                            <button type="button" onClick={manejarMesAnterior}><MdNavigateBefore className="ico-cambiar" />Mes Anterior</button>
                            <button type="button" onClick={manejarMesSiguiente}>Mes Siguiente <MdNavigateNext className="ico-cambiar" /></button>
                        </div>
                    </div>
                    {cargando ? (
                        <p>Cargando datos...</p>
                    ) : (
                        <table ref={tableRef}>
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
                                                    <div className="accion-cabeza">
                                                        <div className="balloon">
                                                            <p>ACCIONES</p>
                                                            <button onClick={() => manejarBloqueoColumna(fecha.toDateString())}>
                                                                {columnaBloqueada ? 'Desbloquear' : 'Bloquear'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {personalesPaginados.map((personal, index) => (
                                    <tr key={personal.id_personal}>
                                        <td style={{ textAlign: 'center' }}>{(paginaActual - 1) * filasPorPagina + index + 1}</td>
                                        <td className="names" onClick={(event) => manejarClickPersonal(personal, event)}>
                                            {`${personal.paterno} ${personal.materno}, ${personal.nombres}`}
                                        </td>
                                        {fechasDelMes.map((fecha, fechaIndex) => {
                                            const esDomingo = fecha.getDay() === 0; // Verifica si es domingo
                                            const columnaBloqueada = columnasBloqueadas.includes(fecha.toDateString()); // Verifica si está bloqueada

                                            return (
                                                <td
                                                    key={fechaIndex}
                                                    className={`${columnaBloqueada ? 'bloqueada' : ''} ${esDomingo ? 'domingo' : ''}`.trim()}
                                                >
                                                    {/* Solo muestra el select si no es domingo y no está bloqueada */}
                                                    {/* {turnos[`${personal.id_personal}_${fecha.toDateString()}`] || ""} */}
                                                    {!esDomingo && !columnaBloqueada && (
                                                        <select
                                                            className={
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'M' ? 'mm' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'T' ? 'tt' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'GD' ? 'gd' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'GDD' ? 'gdd' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'MT' ? 'mt' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'MVD' ? 'mvd' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'TVD' ? 'tvd' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'MVSF' ? 'mvsf' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'TVSL' ? 'tvsl' :
                                                                obtenerClaveTurno(turnos[`${personal.id_personal}_${fecha.toDateString()}`]) === 'L' ? 'll' : ''
                                                            }
                                                            value={turnos[`${personal.id_personal}_${fecha.toDateString()}`] || ""}
                                                            onChange={(e) => manejarGuardarTurno(personal.id_personal, fecha, e.target.value)}
                                                        >
                                                            <option value=""></option>
                                                            {tiposDeTurno.map(turno => (
                                                                <option key={turno.id_turno_tipo} value={turno.id_turno_tipo}>
                                                                    {turno.clave_turno}
                                                                </option>
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
                    <DownloadTableExcel
                        filename="mi_tabla"
                        sheet="Hoja1"
                        currentTableRef={tableRef.current}
                    >
                        <button>Exportar a Excel</button>
                    </DownloadTableExcel>
                    <div className="paginacion">
                        <button onClick={manejarVerMenos} disabled={paginaActual === 1}>Ver menos</button>
                        <button onClick={manejarVerMas} disabled={indiceFinal >= activosFiltrados.length}>Ver más</button>
                    </div>
                    <Leyenda turno={turnos} tiposDeTurno={tiposDeTurno} />
                </section>
            </main>
            {modalAbierto && personalSeleccionado && (
                <div style={{
                    position: 'absolute',
                    top: modalPosicion.top,
                    left: modalPosicion.left,
                    transform: 'translate(0, 0)', // Sin transformación adicional
                }}>
                    <Informacion
                        personals={personalSeleccionado}
                        cerrarModal={cerrarModal}
                        tiposDeTurno={tiposDeTurno}
                    />
                </div>
            )}
        </div>
    );
};

export default AsignaTurno;
