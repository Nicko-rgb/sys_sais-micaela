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
                return 'Guardia Devolución';
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
        <table className="leyenda">
            <thead>
                <tr>
                    <th colSpan={2} style={{ textAlign: 'center', color: 'green', border: 'black solid 1px', backgroundColor: 'lightyellow', fontSize: '14px' }}>
                        LEYENDA DE TURNOS
                    </th>
                </tr>
                <tr>
                    <th style={{border: 'black solid 1px'}}>Clave</th>
                    <th style={{border: 'black solid 1px'}}>Valor</th>
                </tr>
            </thead>
            <tbody>
                {tiposDeTurno.map(tipo => (
                    <tr>
                        <td key={tipo.clave_turno} style={{ border: 'black solid 1px', padding: '5px', fontFamily: 'poppins', fontSize: '12px', textAlign: 'center'}}>
                            {tipo.clave_turno}
                        </td>
                        <td style={{border: 'black solid 1px', fontFamily: 'poppins', fontSize: '12px'}}>{obtenerDescripcionTurno(tipo.clave_turno)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Leyenda;
