import React, { useState, useEffect } from 'react';
import './Citas.css';
import { BiPlusCircle } from "react-icons/bi";
import { PiPencilLineBold } from "react-icons/pi";
import { RxValueNone } from "react-icons/rx";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiLock } from "react-icons/ci";
import FormCitas from './FormCitas';
import axios from 'axios';
import EditCita from './EditCita';
import BorrarCita from './BorrarCita';
import BloqDesbloqDia from './BloqDesbloqDia';
import Store from '../Store/Store_Cita_Turno';

const CuerpoTabla = ({ horarios, especialidad, fecha, consultorio }) => {
    const { citas, personalSalud, turnosPersonal } = Store()
    const [openForm, setOpenForm] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [citaSelect, setCitaSelect] = useState(null)
    const [formData, setFormData] = useState(null);
    const [blockedRows, setBlockedRows] = useState([]);

    // Nuevo estado para el modal de bloqueo/desbloqueo
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHorarioForModal, setSelectedHorarioForModal] = useState(null);
    const [modalAction, setModalAction] = useState(null);

    // Obtener filas bloqueadas desde el servidor
    const fetchBlockedRows = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/nino/verificar-bloqueos-cita');
            setBlockedRows(response.data);
        } catch (error) {
            console.error('Error al obtener filas bloqueadas:', error);
        }
    };

    // Formatear hora en formato HH:mm
    const formatTime = (timeString) => {
        if (!timeString) return '---';
        const [hours, minutes] = timeString.split(':');
        return `${hours?.padStart(2, '0')}:${minutes?.padStart(2, '0')}`;
    };

    // Abrir modal de bloqueo
    const openBlockModal = (horario) => {
        setSelectedHorarioForModal(horario);
        setModalAction('block');
        setIsModalOpen(true);
    };

    // Abrir modal de desbloqueo
    const openUnblockModal = (horario) => {
        setSelectedHorarioForModal(horario);
        setModalAction('unblock');
        setIsModalOpen(true);
    };

    // Cerrar modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedHorarioForModal(null);
        setModalAction(null);
    };

    // Manejar acción de bloqueo/desbloqueo desde el modal
    const handleModalAction = async () => {
        if (!selectedHorarioForModal) return;

        const data = {
            fecha,
            hora_inicio: formatTime(selectedHorarioForModal.hora_inicio),
            hora_fin: formatTime(selectedHorarioForModal.hora_fin),
            consultorio,
            especialidad,
        };

        try {
            if (modalAction === 'block') {
                await axios.post('http://localhost:5000/api/nino/bloquear-hora-cita', data);
                setBlockedRows((prev) => [...prev, data]);
                // alert('Fila bloqueada exitosamente');
            } else {
                await axios.delete('http://localhost:5000/api/nino/desbloquear-hora-cita', { data });
                setBlockedRows((prev) => prev.filter(
                    (blocked) =>
                        blocked.fecha !== fecha ||
                        blocked.hora_inicio !== formatTime(selectedHorarioForModal.hora_inicio) ||
                        blocked.hora_fin !== formatTime(selectedHorarioForModal.hora_fin) ||
                        blocked.consultorio !== consultorio ||
                        blocked.especialidad !== especialidad
                ));
                // alert('Fila desbloqueada exitosamente');
            }
            closeModal();
        } catch (error) {
            console.error(`Error al ${modalAction === 'block' ? 'bloquear' : 'desbloquear'} fila:`, error);
            alert(`No se pudo ${modalAction === 'block' ? 'bloquear' : 'desbloquear'} la fila`);
            closeModal();
        }
    };

    // Abrir el formulario para registrar citas
    const handleOpenForm = (hora_inicio, hora_fin, profesional) => {
        setFormData({
            fecha,
            especialidad,
            hora: `${formatTime(hora_inicio)} - ${formatTime(hora_fin)}`,
            consultorio,
            profesional,
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

                    // Encuentra al profesional responsable para atención para este horario
                    const responsable = turnosPersonal.find((res) => {
                        const isGuardiaDiurna = res.turno === 'Guardia Diurna';

                        // Común a ambas condiciones
                        const isMatchingSpecialty = res.especial_cita.toLowerCase() === especialidad.toLowerCase();
                        const isMatchingConsultorio = Number(res.num_consultorio) === Number(consultorio);
                        const isMatchingFecha = new Date(res.fecha).toISOString().split('T')[0] === fecha;

                        // Retorna true si se cumple la condición correspondiente
                        return (
                            isMatchingSpecialty &&
                            isMatchingConsultorio &&
                            isMatchingFecha &&
                            (isGuardiaDiurna || res.turno.toLowerCase() === horario.turno.toLowerCase())
                        );
                    });

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
                            <td>{cita ? new Date(cita.fecha_nacimiento).toLocaleDateString() : '---'}</td>
                            <td>{cita ? cita.telefono : '---'}</td>
                            {especialidad === 'Medicina' && <td>{cita ? cita.direccion_c : '---'}</td>}
                            {especialidad === 'Obstetricia_CPN' && <td>{cita ? cita.semEmbarazo : '---'}</td>}
                            {especialidad === 'Planificación' && <td>{cita ? cita.metodo : '---'}</td>}
                            <td>{recortarTexto(cita ? cita.motivoConsulta : '---')}</td>
                            <td>{responsable ? `${responsable.paterno} ${responsable.materno}, ${responsable.nombres}` : 'Ninguno, asignar en turnos.'}  </td>

                            <td className="box-ac" style={{ padding: '0' }}>
                                <div className="accion">
                                    {new Date(fecha) < new Date() ? (
                                        <CiLock style={{ color: 'red', cursor: 'initial' }} className="ico ico-" title="Fecha pasada, no editable" />
                                    ) : (
                                        !rowBlocked ? (
                                            cita ? (
                                                <>
                                                    <PiPencilLineBold
                                                        title='EDITAR CITA'
                                                        className="ico ico-edit"
                                                        onClick={() => handleEditForm(cita)}
                                                    />
                                                    <RiDeleteBin6Line
                                                        title='BORRAR CITA'
                                                        className='ico ico-delete'
                                                        onClick={() => handleDelete(cita)}
                                                    />
                                                </>
                                            ) : (
                                                responsable ?
                                                    <>
                                                        <BiPlusCircle
                                                            title='AGREGAR CITA'
                                                            className="ico ico-mas"
                                                            onClick={() => handleOpenForm(horario.hora_inicio, horario.hora_fin, responsable)}
                                                        />
                                                        <RxValueNone
                                                            title='BLOQUEAR HORA'
                                                            className="ico ico-bloq"
                                                            onClick={() => openBlockModal(horario)}
                                                        />
                                                    </>
                                                    : <RxValueNone
                                                        title='BLOQUEAR HORA'
                                                        className="ico ico-bloq"
                                                        onClick={() => openBlockModal(horario)}
                                                    />
                                            )
                                        ) : (
                                            <PiLockKeyOpenFill
                                                title='DESBLOQUEAR HORA'
                                                className="ico ico-abi"
                                                onClick={() => openUnblockModal(horario)}
                                            />
                                        )
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>

            {/* Modales existentes */}
            {openForm && (
                <FormCitas
                    closeForm={closeForm}
                    fecha={formData.fecha}
                    hora={formData.hora}
                    especialidad={formData.especialidad}
                    consultorio={formData.consultorio}
                    profesional={formData.profesional}
                />
            )}
            {openEdit && (
                <EditCita
                    citaData={citaSelect}
                    closeForm={closeForm}
                    horarios={horarios}
                    formatTime={formatTime}
                    especialidad={especialidad}
                />
            )}
            {openDelete && (
                <BorrarCita
                    citaData={citaSelect}
                    close={closeForm}
                />
            )}

            {/* Nuevo modal de bloqueo/desbloqueo */}
            <BloqDesbloqDia
                isModalOpen={isModalOpen}
                modalAction={modalAction}
                selectedHorario={selectedHorarioForModal}
                handleModalAction={handleModalAction}
                closeModal={closeModal}
                formatTime={formatTime}
            />
        </>
    );
};

export default CuerpoTabla;