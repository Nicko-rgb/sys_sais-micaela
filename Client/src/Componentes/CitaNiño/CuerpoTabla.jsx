import React, { useState, useEffect } from 'react';
import './Citas.css';
import { BiPlusCircle } from "react-icons/bi";
import { PiPencilLineBold } from "react-icons/pi";
import { RxValueNone } from "react-icons/rx";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import FormCitas from './FormCitas';
import axios from 'axios';
import EditCita from './EditCita';
import BorrarCita from './BorrarCita';

const CuerpoTabla = ({ horarios, especialidad, fecha, consultorio }) => {
    const [openForm, setOpenForm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [citaSelect, setCitaSelect] = useState(null)
    const [formData, setFormData] = useState(null);
    const [blockedRows, setBlockedRows] = useState([]);
    const [citas, setCitas] = useState([]);

    // Obtener filas bloqueadas desde el servidor
    const fetchBlockedRows = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/nino/verificar-bloqueos-cita');
            setBlockedRows(response.data);
        } catch (error) {
            console.error('Error al obtener filas bloqueadas:', error);
        }
    };

    const fetchCitas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/filtrar-todas-citas-ninho')
            setCitas(response.data);
        } catch (error) {
            console.error('Error al obtener citas:', error);
        }
    }

    // Formatear hora en formato HH:mm
    const formatTime = (timeString) => {
        if (!timeString) return '---';
        const [hours, minutes] = timeString.split(':');
        return `${hours?.padStart(2, '0')}:${minutes?.padStart(2, '0')}`;
    };

    // Bloquear una fila
    const handleBlockRow = async (horario) => {
        const data = {
            fecha,
            hora_inicio: formatTime(horario.hora_inicio),
            hora_fin: formatTime(horario.hora_fin),
            consultorio,
            especialidad,
        };

        try {
            await axios.post('http://localhost:5000/api/nino/bloquear-hora-cita', data);
            setBlockedRows((prev) => [...prev, data]);
            alert('Fila bloqueada exitosamente');
        } catch (error) {
            console.error('Error al bloquear fila:', error);
            alert('No se pudo bloquear la fila');
        }
    };

    // Desbloquear una fila
    const handleUnblockRow = async (horario) => {
        const data = {
            fecha,
            hora_inicio: formatTime(horario.hora_inicio),
            hora_fin: formatTime(horario.hora_fin),
            consultorio,
            especialidad,
        };

        try {
            await axios.delete('http://localhost:5000/api/nino/desbloquear-hora-cita', { data });
            // Actualizar el estado para eliminar la fila bloqueada de las filas bloqueadas
            setBlockedRows((prev) => prev.filter(
                (blocked) =>
                    blocked.fecha !== fecha ||
                    blocked.hora_inicio !== formatTime(horario.hora_inicio) ||
                    blocked.hora_fin !== formatTime(horario.hora_fin) ||
                    blocked.consultorio !== consultorio ||
                    blocked.especialidad !== especialidad
            ));
            alert('Fila desbloqueada exitosamente');
        } catch (error) {
            console.error('Error al desbloquear fila:', error);
            alert('No se pudo desbloquear la fila');
        }
    };


    // Abrir el formulario para gestionar citas
    const handleOpenForm = (hora_inicio, hora_fin) => {
        setFormData({
            fecha,
            especialidad,
            hora: `${formatTime(hora_inicio)} - ${formatTime(hora_fin)}`,
            consultorio,
        });
        setOpenForm(true);
    };

    //abrir el formulario para editar cita
    const handleEditForm = (citaEdit) => {
        setCitaSelect(citaEdit)
        setOpenEdit(true)
    }

    const handleDelete = (citaEdit) => {
        setCitaSelect(citaEdit)
        setOpenDelete(true)
    } 

    const isRowBlocked = (horario) => {
        return blockedRows.some(
            (blocked) =>
                blocked.fecha === fecha &&
                blocked.hora_inicio === formatTime(horario.hora_inicio) &&
                blocked.hora_fin === formatTime(horario.hora_fin) &&
                blocked.especialidad === especialidad &&
                Number(blocked.consultorio) === Number(consultorio)
        );
    };

    // Cerrar el formulario
    const closeForm = () => {
        setOpenForm(false);
        setFormData(null);
        setCitaSelect(null)
        setOpenEdit(false)
        setOpenDelete(false)
    };

    // Cargar datos al cargar componente
    useEffect(() => {
        fetchBlockedRows();
    }, []);

    useEffect(() => {
        fetchCitas();
        const intervalId = setInterval(() => {
            fetchCitas();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); 

    //creamos una funcion para recortar un texto
    const recortarTexto = (texto) => {
        if (texto.length > 30) {
            return texto.substring(0, 30) + '...';
        }
        return texto
    }

    return (
        <>
            <tbody>
                {horarios.map((horario, index) => {
                    const rowBlocked = isRowBlocked(horario);

                    // Encuentra una cita filtrada que coincida con este horario
                    const cita = citas.find(
                        (c) =>
                            c.hora === `${formatTime(horario.hora_inicio)} - ${formatTime(horario.hora_fin)}` &&
                            c.especialidad === especialidad &&
                            c.consultorio === consultorio &&
                            new Date(c.fecha).toISOString().split('T')[0] === fecha
                    );

                    if (horario.tipo_atencion === 'receso') {
                        return (
                            <tr key={index} className="receso">
                                <td style={{ textAlign: 'center' }} colSpan="2">
                                    {formatTime(horario.hora_inicio)} - {formatTime(horario.hora_fin)}
                                </td>
                                <td style={{ textAlign: 'center' }} colSpan={8}>Receso</td>
                                {(especialidad === 'Medicina' || especialidad === 'Obstetricia_CPN' || especialidad === 'Planificación') && (
                                    <td className="box-ac"></td>
                                )}
                            </tr>
                        );
                    }

                    // Agregar clase si la fila está bloqueada
                    const rowClass = [
                        horario.tipo_atencion === 'AtencionEspecial' ? 'atencion-especial' : 'normal',
                        rowBlocked ? 'bloqueada' : '',
                    ].filter(Boolean).join(' ');

                    return (
                        <tr key={index} className={rowClass}>
                            <td>{`${formatTime(horario.hora_inicio)} - ${formatTime(horario.hora_fin)}`}</td>
                            <td>{horario.turno}</td>
                            <td>{cita ? cita.dni : '---'}</td>
                            <td>{cita ? cita.nombres : '---'} {cita ? cita.apellidos : '---'} </td>
                            <td>{cita ? cita.edad : '---'}</td>
                            <td>{cita ? new Date(cita.fechaNacimiento).toLocaleDateString() : '---'}</td>
                            <td>{cita ? cita.telefono : '---'}</td>
                            {especialidad === 'Medicina' && <td>{cita ? cita.direccion : '---'}</td>}
                            {especialidad === 'Obstetricia_CPN' && <td>{cita ? cita.semEmbarazo : '---'}</td>}
                            {especialidad === 'Planificación' && <td>{cita ? cita.metodo : '---'}</td>}
                            <td>{recortarTexto(cita ? cita.motivoConsulta : '---')}</td>
                            <td>Responsable </td>
                            <td className="box-ac" style={{ padding: '0' }}>
                                <div className="accion">
                                    {!rowBlocked ? (
                                        <>
                                            {cita ? (
                                                <>
                                                    <PiPencilLineBold title='EDITAT CITA' className="ico ico-edit" onClick={() => handleEditForm(cita) } />
                                                    <RiDeleteBin6Line title='BORRAR CITA' className='ico ico-delete' onClick={() => handleDelete(cita)} />
                                                </>
                                            ) : (
                                                <>
                                                    <BiPlusCircle
                                                        title='AGREGAR CITA'
                                                        className="ico ico-mas"
                                                        onClick={() => handleOpenForm(horario.hora_inicio, horario.hora_fin)}
                                                    />
                                                    <RxValueNone
                                                        title='BLOQUEAR HORA'
                                                        className="ico ico-bloq"
                                                        onClick={() => handleBlockRow(horario)}
                                                    />
                                                </>
                                            )}

                                        </>
                                    ) : (
                                        <PiLockKeyOpenFill className="ico ico-abi" onClick={() => handleUnblockRow(horario)} />
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>

            {openForm && (
                <FormCitas
                    closeForm={closeForm}
                    fecha={formData.fecha}
                    hora={formData.hora}
                    especialidad={formData.especialidad}
                    consultorio={formData.consultorio}
                />
            )}
            {openEdit && (
                <EditCita
                    citaData = {citaSelect}
                    closeForm={closeForm}
                    horarios = {horarios}
                    formatTime = {formatTime}
                 />
            )}
            {openDelete && (
                <BorrarCita
                    citaData = {citaSelect}
                    close={closeForm}
                 />
            )}
        </>
    );
};

export default CuerpoTabla;
