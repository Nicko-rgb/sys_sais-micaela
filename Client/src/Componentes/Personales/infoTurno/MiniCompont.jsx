import React from 'react';
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


export const FormSector = ({ closeForm, selectedManzana }) => {
    return (
        <div>
            <h3>Asignar Responsable para Manzana {selectedManzana}</h3>
            <form>
                <label>
                    Nombre del Profesional:
                    <input type="text" placeholder="Nombre" />
                </label>
                <br />
                <button type="submit">Guardar</button>
                <button type="button" onClick={closeForm}>
                    Cancelar
                </button>
            </form>
        </div>
    )
}


export default { Leyenda, LeyendasTurno, FormSector }
