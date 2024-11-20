import React from 'react';
import './Citas.css';
import CuerpoTabla from './CuerpoTabla';

const Citas2 = ({ especialidad, fecha, fechaT, horarios,  consultorio }) => {
    const formatTime = (timeString) => {
        if (!timeString) return '---';

        const parts = timeString.split(':');
        if (parts.length < 2) return '---';

        const hours = parts[0].padStart(2, '0');
        const minutes = parts[1].padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    return (
        <div className="container-tb">
            <div className="header-tab">
                <p className="sub-title-page">CONSULTORIO N° { consultorio}</p>
                <p className='sub-title-page'>{fechaT} </p>
            </div>
            <table className="cita-table">
                <thead>
                    <tr>
                        <th>Hora</th>
                        <th>Turno</th>
                        <th>DNI</th>
                        <th>Apellidos y Nombres</th>
                        <th>Edad</th>
                        <th>Fecha Nacimiento</th>
                        <th>Celular</th>
                        {especialidad === 'Medicina' && <th>Dirección</th>}
                        {especialidad === 'Obstetricia_CPN' && <th>Sem. de Embarazo</th>}
                        {especialidad === 'Planificación' && <th>Método Planificación</th>}
                        <th>Motivo Consulta</th>
                        <th>Responsable</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <CuerpoTabla
                        horarios={horarios}
                        especialidad={especialidad}
                        formatTime={formatTime}
                        fecha={fecha}
                        consultorio={ consultorio}
                    />
            </table>
        </div>
    );
};

export default Citas2;
