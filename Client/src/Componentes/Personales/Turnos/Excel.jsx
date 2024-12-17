import React, { useState, useEffect, useRef } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { RiFileExcel2Fill } from "react-icons/ri";
import './excel.css';
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LeyendasTurno } from "../infoTurno/MiniCompont";
import Store from "../../Store/Store_Cita_Turno";


const ExportExcel = () => {
    const [personales, setPersonales] = useState([]);
    const [mesActual, setMesActual] = useState(new Date());
    const [turnos, setTurnos] = useState([]);
    const [tiposDeTurno, setTiposDeTurno] = useState([]);
    const [columnasBloqueadas, setColumnasBloqueadas] = useState([]);
    const tableRef = useRef(null);
    const { coloresTurno } = Store()

    // Cargar datos de personales, turnos y tipos de turno
    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const [personalRes, turnosRes, tiposTurnoRes, fechasBloqueadasRes] = await Promise.all([
                    fetch('http://localhost:5000/api/obtener/personal-salud'),
                    fetch('http://localhost:5000/api/obtener-turnos/personal'),
                    fetch('http://localhost:5000/api/tipos-turno'),
                    fetch('http://localhost:5000/api/obtener-fechas-bloqueadas')
                ]);

                const personalData = await personalRes.json();
                const turnosData = await turnosRes.json();
                const tiposTurnoData = await tiposTurnoRes.json();
                const fechasBloqueadasData = await fechasBloqueadasRes.json();

                setPersonales(personalData.filter(personal => personal.estado === 'activo'));
                setTurnos(turnosData);
                setTiposDeTurno(tiposTurnoData);
                setColumnasBloqueadas(fechasBloqueadasData.map(f => new Date(f.fecha).toDateString()));
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchDatos();
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
        <div className="turnos-export">
            <main>
                <h3 className="title-page">EXPORTAR DATOS A EXCEL</h3>
                <section>
                    <div className="acciones">
                        <Link to="/personal-salud" className='volver_link'>
                            <RiPlayReverseLargeFill /> VOLVER
                        </Link>
                        <p>{mesActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</p>
                        <button type="button" onClick={handleMesAnterior}>
                            <MdNavigateBefore /> Mes Anterior
                        </button>
                        <button type="button" onClick={handleMesSiguiente}>
                            Mes Siguiente <MdNavigateNext />
                        </button>
                    </div>
                    <div className="tbl" ref={tableRef}>
                        <h3 className="title-page" colSpan={fechasDelMes.length + 2} style={{textTransform: 'uppercase'}}>TURNOS DE PERSONAL DE SALUD DEL MES DE {mesActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h3>
                        <br />
                        <table>
                            <thead>
                                <tr style={{ background: 'none', fontSize: '14px', height: '25px' }}>
                                    <th style={{ border: 'black solid 1px', background: 'rgb(4, 186, 165)' }}>N°</th>
                                    <th style={{ border: 'black solid 1px', background: 'rgb(4, 186, 165)' }}>Personal</th>
                                    {fechasDelMes.map((fecha, index) => {
                                        const diaSemana = fecha.toLocaleString('es-ES', { weekday: 'short' });
                                        const numeroDia = fecha.getDate();
                                        const isBloqueado = columnasBloqueadas.includes(fecha.toDateString());
                                        const isDomingo = fecha.getDay() === 0;
                                        return (
                                            <th
                                                key={index}
                                                style={{
                                                    padding: '2px 5px',
                                                    fontSize: '10px',
                                                    fontFamily: 'arial',
                                                    border: 'black solid 1px',
                                                    backgroundColor: isBloqueado ? 'rgb(255, 180, 180)' : isDomingo ? 'rgb(183, 183, 183)' : 'rgb(4, 186, 165)',
                                                    color: isBloqueado || isDomingo ? 'black' : '',
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
                                        <tr style={{ borderRight: 'black solid 1px', height: '25px' }}>
                                            <td colSpan={fechasDelMes.length + 2} style={{fontSize: '14px', textAlign: 'center', fontWeight: 'bold', padding: '0', backgroundColor: 'lightyellow', border: 'black solid 1px' }}>{servicio}</td>
                                        </tr>
                                        {gruposPorServicio[servicio].map((personal, idx) => (
                                            <tr key={idx} style={{height: '25px'}}>
                                                <td style={{ border: 'black solid 1px', fontSize: '10px', padding: '0', textAlign: 'center' }}>{idx + 1}</td>
                                                <td style={{ border: 'black solid 1px', fontFamily: 'arial', whiteSpace: 'nowrap', textTransform: 'uppercase', fontSize: '10px', padding: '7px' }}>
                                                    {`${personal.paterno} ${personal.materno} ${personal.nombres}`}
                                                </td>
                                                {fechasDelMes.map((fecha, index) => {
                                                    const fechaString = fecha.toDateString();
                                                    const turnoAsignado = turnos.find(
                                                        (turno) => turno.id_personal === personal.id_personal && new Date(turno.fecha).toDateString() === fechaString
                                                    );
                                                    const isBloqueado = columnasBloqueadas.includes(fechaString);
                                                    const isDomingo = fecha.getDay() === 0;

                                                    // Obtener la clave del turno y el color correspondiente
                                                    const claveTurno = obtenerClaveTurno(turnoAsignado?.id_turno_tipo);
                                                    const colorTurno = claveTurno ? coloresTurno[claveTurno] || '' : '';

                                                    return (
                                                        <td
                                                            key={index}
                                                            style={{
                                                                border: 'black solid 1px',
                                                                backgroundColor: isBloqueado ? 'rgb(255, 180, 180)' : isDomingo ? 'rgb(183, 183, 183)' : '',
                                                                fontSize: '10px',
                                                                padding: 0,
                                                                height: '25px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'center',
                                                                color: isBloqueado || isDomingo ? 'none' : colorTurno,
                                                            }}
                                                        >
                                                            {isBloqueado ? '' : claveTurno}
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
                        <LeyendasTurno tiposDeTurno={tiposDeTurno} />
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
