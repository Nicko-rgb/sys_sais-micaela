import React, { useState, useEffect } from "react";
import './turnos.css';
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const diasDeLaSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const TurnoPersonal = ({ personData, onClose }) => {
    const [tiposDeTurno, setTiposDeTurno] = useState([]);
    const [turnosExistentes, setTurnosExistentes] = useState({});
    const [semanaActual, setSemanaActual] = useState(new Date());
    const [turnosSeleccionados, setTurnosSeleccionados] = useState({});
    const hoy = new Date();

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
        const fetchTurnosExistentes = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/personal/${personData.id_personal}/turnos`);
                const data = await response.json();

                const turnosExistentesMap = {};
                data.forEach(turno => {
                    const fechaSinHora = new Date(turno.fecha).toISOString().split('T')[0]; // Formato YYYY-MM-DD
                    turnosExistentesMap[`${fechaSinHora}-${turno.id_turno_tipo}`] = true; // Usamos una combinación de fecha y tipo de turno como clave
                });

                setTurnosExistentes(turnosExistentesMap);
            } catch (error) {
                console.error('Error al obtener los turnos existentes:', error);
            }
        };

        fetchTurnosExistentes();
    }, [personData]);

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

    const fechasDeLaSemana = obtenerFechasDeLaSemana(semanaActual);

    const manejarCambioDeTurno = (fecha, idTurnoTipo) => {
        const clave = `${fecha}-${idTurnoTipo}`;
        const nuevosTurnosSeleccionados = { ...turnosSeleccionados };
        const diaClave = fecha;

        // Desmarcar todos los turnos en la misma columna (día)
        for (const key in nuevosTurnosSeleccionados) {
            if (key.startsWith(diaClave)) {
                delete nuevosTurnosSeleccionados[key];
            }
        }

        // Si el turno ya está marcado y lo volvemos a marcar, lo desmarcamos
        if (nuevosTurnosSeleccionados[clave]) {
            delete nuevosTurnosSeleccionados[clave];
        } else {
            // Si no estaba seleccionado, lo marcamos
            nuevosTurnosSeleccionados[clave] = true;
        }

        setTurnosSeleccionados(nuevosTurnosSeleccionados);
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

    const guardarTurnos = async (e) => {
        e.preventDefault();
        const turnosAEnviar = [];

        fechasDeLaSemana.forEach(fecha => {
            const claveDia = fecha.toISOString().split('T')[0]; // Clave de la fecha en formato 'YYYY-MM-DD'

            tiposDeTurno.forEach(tipoDeTurno => {
                const claveTurno = `${claveDia}-${tipoDeTurno.id_turno_tipo}`;
                // Solo agrega los turnos seleccionados que estén en el estado
                if (turnosSeleccionados[claveTurno]) {
                    turnosAEnviar.push({
                        id_personal: personData.id_personal,
                        fecha: claveDia,
                        id_turno_tipo: tipoDeTurno.id_turno_tipo
                    });
                }
            });
        });

        try {
            const response = await fetch('http://localhost:5000/api/personal/guardar-turnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(turnosAEnviar),
            });

            if (response.ok) {
                alert('Turnos guardados exitosamente');
                onClose(); // Cerrar modal o formulario después de guardar
            } else {
                alert('Error al guardar los turnos');
            }
        } catch (error) {
            console.error('Error al guardar los turnos:', error);
        }
    };

    return (
        <form className="turnos" onSubmit={guardarTurnos}>
            <h3>Asignar Turnos por Semanas</h3>
            <div className="datos">
                <p>{personData.paterno} {personData.materno} {personData.nombres}</p>
                <p>{semanaActual.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="btn-nav">
                <button type="button" onClick={manejarSemanaAnterior}><MdNavigateBefore className="ico"/>Semana Anterior</button>
                <button type="button" onClick={manejarSiguienteSemana}>Siguiente Semana <MdNavigateNext className="ico"/></button>
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
                            <td className="turno-colum">{tipoDeTurno.turno} ({tipoDeTurno.clave_turno})</td>
                            {fechasDeLaSemana.map((fecha, index) => {
                                const claveDia = fecha.toISOString().split('T')[0]; // Formato de fecha YYYY-MM-DD
                                const esFechaPasada = fecha < hoy;

                                // Verifica si hay un turno existente para esa fecha y tipo de turno
                                const checked = turnosExistentes[`${claveDia}-${tipoDeTurno.id_turno_tipo}`];

                                return (
                                    <td key={index} className={turnosSeleccionados[`${claveDia}-${tipoDeTurno.id_turno_tipo}`] || !!checked ? 'css' : ''}>
                                        <input
                                            type="checkbox"
                                            checked={turnosSeleccionados[`${claveDia}-${tipoDeTurno.id_turno_tipo}`] || !!checked} // Verifica si está en turnos seleccionados o si es un turno existente
                                            onChange={() => manejarCambioDeTurno(claveDia, tipoDeTurno.id_turno_tipo)}
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
            <div className="btn-turno-action">
                <button type="submit" className="btn-guardar">Guardar</button>
                <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
};

export default TurnoPersonal;
