import React, { useState } from 'react';
import './leyenda.css';
import Store from '../../Store/Store_Cita_Turno';

export const Leyenda = ({ tiposDeTurno }) => {
    const { obtenerDescripcionTurno } = Store()
    return (
        <table className="leyenda">
            <thead>
                <tr>
                    <th colSpan={2} style={{ textAlign: 'center', color: 'green', border: 'black solid 1px', backgroundColor: 'lightyellow', fontSize: '14px' }}>
                        LEYENDA DE TURNOS
                    </th>
                </tr>
                <tr>
                    <th style={{ border: 'black solid 1px' }}>Clave</th>
                    <th style={{ border: 'black solid 1px' }}>Valor</th>
                </tr>
            </thead>
            <tbody>
                {tiposDeTurno.map(tipo => (
                    <tr>
                        <td key={tipo.clave_turno} style={{ border: 'black solid 1px', padding: '5px', fontFamily: 'poppins', fontSize: '12px', textAlign: 'center' }}>
                            {tipo.clave_turno}
                        </td>
                        <td style={{ border: 'black solid 1px', fontFamily: 'poppins', fontSize: '12px' }}>{obtenerDescripcionTurno(tipo.clave_turno)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export const LeyendasTurno = ({ tiposDeTurno }) => {
    const { obtenerDescripcionTurno, coloresTurno } = Store();

    return (
        <div className="leyenda-turno">
            {tiposDeTurno.map(tipo => (
                <p key={tipo.clave_turno}>
                    <span
                        style={{
                            display: "inline-block",
                            width: "15px",
                            height: "15px",
                            backgroundColor: coloresTurno[tipo.clave_turno] || '#FFFFFF',
                            marginRight: "8px",
                            borderRadius: "3px"
                        }}
                    ></span>
                    {tipo.clave_turno}: {obtenerDescripcionTurno(tipo.clave_turno)}
                </p>
            ))}
        </div>
    );
};

export const TablaForSector = ({ data, searchTerm }) => {
    if (!data || data.length === 0) {
        return <p>No hay datos disponibles.</p>;
    }

    // Eliminar espacios del término de búsqueda
    const cleanedSearchTerm = searchTerm.replace(/\s+/g, '').toLowerCase();

    // Filtrar los datos para incluir solo aquellos con estado "activo"
    const activeData = data.filter(d => d.estado === 'activo');

    // Filtrar los datos activos según el término de búsqueda, ignorando espacios
    const filteredData = activeData.filter((d) => {
        const fullName = `${d.paterno}${d.nombres}${d.materno}`.replace(/\s+/g, '').toLowerCase();
        return fullName.includes(cleanedSearchTerm) || d.dni.includes(cleanedSearchTerm);
    });

    // Determinar si se debe mostrar la columna "Código - Mz"
    const shouldShowColumn = filteredData.some(d => d.codigo);

    if (filteredData.length === 0) {
        return <p>No se encontraron resultados.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>DNI</th>
                    <th>Nombres</th>
                    <th>Profesión</th>
                    {shouldShowColumn &&
                        <th>Código - Mz</th>
                    }
                </tr>
            </thead>
            <tbody>
                {filteredData.map((d, index) => (
                    <tr key={index}>
                        <td>{d.dni}</td>
                        <td>{d.paterno} {d.nombres} {d.materno}</td>
                        <td>{d.profesion}</td>
                        {shouldShowColumn &&
                            <td>{d.codigo} - {d.manzana}</td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
};





export default { Leyenda, LeyendasTurno, TablaForSector }
