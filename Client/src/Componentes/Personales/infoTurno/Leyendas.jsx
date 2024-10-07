import React from 'react';
import './leyenda.css';

const Leyenda = ({ tiposDeTurno }) => {
    const obtenerDescripcionTurno = (clave_turno) => {
        switch (clave_turno) {
            case 'M':
                return 'Mañana';
            case 'T':
                return 'Tarde';
            case 'MT':
                return 'Mañana y Tarde';
            case 'GD':
                return 'Guardia Diurna';
            case 'GDD':
                return 'Guardia Devolucion';
            case 'MVD':
                return 'Mañana Variable';
            case 'TVD':
                return 'Tarde Variable';
            case 'MVSF':
                return 'Mañana Variable Sin Fines de Semana';
            case 'TVSL':
                return 'Tarde Variable Sin Lunes';
            case 'L':
                return 'Libre';
            default:
                return 'Desconocido';
        }
    };

    return (
        <div className="leyenda">
            {tiposDeTurno.map(tipo => (
                <p key={tipo.clave_turno}>
                    {tipo.clave_turno}: {obtenerDescripcionTurno(tipo.clave_turno)}
                </p>
            ))}
        </div>
    );
};

export default Leyenda;
