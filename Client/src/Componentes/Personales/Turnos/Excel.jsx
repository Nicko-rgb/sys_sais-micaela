import React, { useState, useEffect, useRef } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { RiFileExcel2Fill } from "react-icons/ri";
import './excel.css';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Leyenda from "../infoTurno/Leyendas";


const ExportExcel = () => {
    const [personales, setPersonales] = useState([]);
    const [mesActual, setMesActual] = useState(new Date());
    const [turnos, setTurnos] = useState([]);
    const [tiposDeTurno, setTiposDeTurno] = useState([]);
    const [columnasBloqueadas, setColumnasBloqueadas] = useState([]);
    const tableRef = useRef(null);

    // Cargar datos de personales, turnos y tipos de turno
    useEffect(() => {
        const fetchPersonales = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/obtener/personal-salud');
                const data = await response.json();
                // Filtrar solo personales activos
                const activos = data.filter(personal => personal.estado === 'activo');
                setPersonales(activos);
            } catch (error) {
                console.error('Error al obtener los personales de salud:', error);
            }
        };

        const fetchTiposDeTurno = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/tipos-turno');
                const data = await response.json();
                setTiposDeTurno(data);
            } catch (error) {
                console.error('Error al obtener los tipos de turnos:', error);
            }
        };

        const fetchTurnosPersonal = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/obtener-turnos/personal');
                const data = await response.json();
                setTurnos(data);
            } catch (error) {
                console.error('Error al obtener los turnos del personal:', error);
            }
        };

        const fetchFechasBloqueadas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/obtener-fechas-bloqueadas');
                const data = await response.json();
                setColumnasBloqueadas(data.map(f => new Date(f.fecha).toDateString()));
            } catch (error) {
                console.error('Error al obtener las fechas bloqueadas:', error);
            }
        };

        fetchPersonales();
        fetchTiposDeTurno();
        fetchTurnosPersonal();
        fetchFechasBloqueadas();
    }, [mesActual]);

    // Obtener fechas del mes actual
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

    // Obtener clave de turno
    const obtenerClaveTurno = (id_turno_tipo) => {
        const turno = tiposDeTurno.find(t => t.id_turno_tipo === id_turno_tipo);
        return turno ? turno.clave_turno : '';
    };

    // Navegar entre meses
    const handleMesSiguiente = () => {
        setMesActual(prev => {
            const nuevoMes = new Date(prev);
            nuevoMes.setMonth(nuevoMes.getMonth() + 1);
            return nuevoMes;
        });
    };

    const handleMesAnterior = () => {
        setMesActual(prev => {
            const nuevoMes = new Date(prev);
            nuevoMes.setMonth(nuevoMes.getMonth() - 1);
            return nuevoMes;
        });
    };

    // Agrupar personales por servicio
    const agruparPorServicio = (personales) => {
        return personales.reduce((grupos, personal) => {
            const servicio = personal.servicio || 'Sin Servicio'; // Asegúrate de que 'servicio' existe
            if (!grupos[servicio]) {
                grupos[servicio] = [];
            }
            grupos[servicio].push(personal);
            return grupos;
        }, {});
    };

    const gruposPorServicio = agruparPorServicio(personales);

    return (
        <div className="turnos-personal aaa">
            <main>
                <h3>EXPORTAR DATOS A EXCEL</h3>
                <section>
                    <div className="fecha-cambiar">
                        <Link to="/personal-salud" className='volver_link'>
                            <RiPlayReverseLargeFill /> VOLVER
                        </Link>
                        <h4>{mesActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h4>
                        <button type="button" onClick={handleMesAnterior}>
                            <MdNavigateBefore /> Mes Anterior
                        </button>
                        <button type="button" onClick={handleMesSiguiente}>
                            Mes Siguiente <MdNavigateNext />
                        </button>
                    </div>
                    <div ref={tableRef}>
                        <h3>TURNOS DE PERSONAL DE SALUD DEL MES DE {mesActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ border: 'black solid 1px', backgroundColor: 'green', padding: '5px' }}>N°</th>
                                    <th style={{ border: 'black solid 1px', backgroundColor: 'green' }}>Personal</th>
                                    {fechasDelMes.map((fecha, index) => {
                                        const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
                                        const numeroDia = fecha.getDate();
                                        const isBloqueado = columnasBloqueadas.includes(fecha.toDateString());
                                        const isDomingo = fecha.getDay() === 0;
                                        return (
                                            <th
                                                key={index}
                                                style={{
                                                    border: 'black solid 1px',
                                                    backgroundColor: isBloqueado ? 'pink' : isDomingo ? 'gray' : 'green',
                                                    color: isBloqueado || isDomingo ? 'black' : 'white',
                                                }}
                                            >
                                                {diaSemana.charAt(0).toUpperCase()}-{numeroDia}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(gruposPorServicio).map((servicio, index) => (
                                    <React.Fragment key={servicio}>
                                        <tr style={{borderRight: 'black solid 1px'}}>
                                            <td colSpan={2} style={{ textAlign: 'left', fontWeight: 'bold', backgroundColor: 'lightyellow', border: 'black solid 1px' }}>{servicio}</td>
                                            {fechasDelMes.map((_, index) => (
                                                <td className="celda-vacio" style={{border: 'none'}} key={index}></td>
                                            ))}
                                        </tr>
                                        {gruposPorServicio[servicio].map((personal, idx) => (
                                            <tr key={idx}>
                                                <td style={{ border: 'black solid 1px', textAlign: 'center' }}>{idx + 1}</td>
                                                <td style={{ border: 'black solid 1px', fontFamily:'poppins', textTransform: 'uppercase', fontSize: '12px', padding: '5px' }}>{`${personal.paterno} ${personal.materno} ${personal.nombres}`}</td>
                                                {fechasDelMes.map((fecha, index) => {
                                                    const fechaString = fecha.toDateString();
                                                    const turnoAsignado = turnos.find(turno => turno.id_personal === personal.id_personal && new Date(turno.fecha).toDateString() === fechaString);
                                                    const isBloqueado = columnasBloqueadas.includes(fechaString);
                                                    const isDomingo = fecha.getDay() === 0;
                                                    return (
                                                        <td
                                                            key={index}
                                                            style={{
                                                                border: 'black solid 1px',
                                                                backgroundColor: isBloqueado ? 'pink' : isDomingo ? 'gray' : '',
                                                                fontSize: '12px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center'
                                                            }}
                                                        >
                                                            {isBloqueado ? '' : obtenerClaveTurno(turnoAsignado?.id_turno_tipo)}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                        <p></p>
                        <Leyenda tiposDeTurno={tiposDeTurno}/>
                    </div>
                    <DownloadTableExcel
                        filename="personal-turnos"
                        sheet="Turnos"
                        currentTableRef={tableRef.current}
                    >
                        <button className="exportar-excel"><RiFileExcel2Fill /> Exportar</button>
                    </DownloadTableExcel>
                </section>
            </main>
        </div>
    );
};

export default ExportExcel;
