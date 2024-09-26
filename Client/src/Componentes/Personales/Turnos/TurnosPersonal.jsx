import React, { useState } from "react";
import './turnos.css'
import tiposDeTurno from "../../Complementos/Turnos";

const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const TurnoPersonal = ({ personData, cerrarTblTurno }) => {
    const [turnosPorSemana, setTurnosPorSemana] = useState({});
    const [semanaActual, setSemanaActual] = useState(new Date());
    const hoy = new Date();

    const obtenerFechasDeLaSemana = (fechaInicio) => {
        const semana = [];
        const inicioDeSemana = new Date(fechaInicio);
        inicioDeSemana.setDate(inicioDeSemana.getDate() - inicioDeSemana.getDay() + 1);
        for (let i = 0; i < 7; i++) {
            const dia = new Date(inicioDeSemana);
            dia.setDate(inicioDeSemana.getDate() + i);
            semana.push(dia);
        }
        return semana;
    };

    const obtenerClaveDeSemana = (fecha) => {
        const inicioDeSemana = new Date(fecha);
        inicioDeSemana.setDate(inicioDeSemana.getDate() - inicioDeSemana.getDay() + 1);
        return inicioDeSemana.toDateString();
    };

    const manejarCambioDeTurno = (dia, tipoDeTurno) => {
        const claveSemana = obtenerClaveDeSemana(semanaActual);
        const turnosActualizados = { ...turnosPorSemana[claveSemana], [dia]: tipoDeTurno };
        setTurnosPorSemana({ ...turnosPorSemana, [claveSemana]: turnosActualizados });
    };

    const manejarSiguienteSemana = () => {
        const siguienteSemana = new Date(semanaActual);
        siguienteSemana.setDate(semanaActual.getDate() + 7);
        setSemanaActual(siguienteSemana);
    };

    const manejarSemanaAnterior = () => {
        const semanaAnterior = new Date(semanaActual);
        semanaAnterior.setDate(semanaActual.getDate() - 7);
        setSemanaActual(semanaAnterior);
    };

    const fechasDeLaSemana = obtenerFechasDeLaSemana(semanaActual);
    const claveSemanaActual = obtenerClaveDeSemana(semanaActual);
    const turnos = turnosPorSemana[claveSemanaActual] || {};

    return (
        <form className="turnos">
            <h3>Asignar Turnos por Semana</h3>
            <p>FECHA MES: {semanaActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</p>
            <div className="btn-nav">
                <button type="button" onClick={manejarSemanaAnterior}>Semana Anterior</button>
                <button type="button" onClick={manejarSiguienteSemana}>Siguiente Semana</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Turno</th>
                        {fechasDeLaSemana.map((fecha, index) => (
                            <th key={index}>
                                {diasDeLaSemana[index]} <br /> ({fecha.toLocaleDateString()})
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tiposDeTurno.map((tipoDeTurno, indiceTurno) => (
                        <tr key={indiceTurno}>
                            <td className="turno-colum">{tipoDeTurno}</td>
                            {fechasDeLaSemana.map((fecha, index) => {
                                const claveDia = fecha.toDateString();
                                const esFechaPasada = fecha < hoy;
                                return (
                                    <td key={index}>
                                        <input
                                            type="checkbox"
                                            checked={turnos[claveDia] === tipoDeTurno}
                                            onChange={() => manejarCambioDeTurno(claveDia, tipoDeTurno)}
                                            disabled={esFechaPasada}
                                            className={esFechaPasada ? 'checkbox-inactivo' : ''}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="name">{personData.paterno} {personData.materno} {personData.nombres} </p>
            <div className="btn-turno-action">
                <button type="submit" className="btn-guardar">Guardar</button>
                <button type="button" className="btn-cancel" onClick={cerrarTblTurno}>Cancelar</button>
            </div>
        </form>
    );
};

export default TurnoPersonal;
