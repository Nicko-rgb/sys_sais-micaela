import React from 'react';
import "./estilosGeneralControl.css"
import { useNavigate } from 'react-router-dom';

const HistorialVisitas = () => {

    const navigate = useNavigate(); // Hook de navegación

    const handleNewVisitClick = () => {
        navigate('/visita'); // Redirige a la ruta de "Nueva Visita"
    };



    return (
        <div className='HistorialVisitas-container '>
            <div className="HistorialVisitas">
            <button className="HistorialVisitas__new-visit" onClick={handleNewVisitClick}>+ Nueva Visita</button>
            <h2 className="HistorialVisitas__title">Listado de Visitas Domiciliarias</h2>
            <div className="HistorialVisitas__search">

                <label className='labelBuscar' htmlFor="buscar-registro">Buscar registro:</label>
                <input className="inputBuscar" type="text" id="buscar-registro" placeholder="Buscar registro" />
            </div>
            <table className="HistorialVisitas__table">
                <thead>
                    <tr>
                        <th>Fecha Visita</th>
                        <th>Edad</th>
                        <th>#Visita</th>
                        <th>Opcional</th>
                        <th>Estado</th>
                        <th>C</th>
                        <th>S</th>
                        <th>V</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="9">No hay datos disponibles</td>
                    </tr>
                </tbody>
            </table>
            <div className="HistorialVisitas__pagination">
                <span>Mostrando 0 a 0 de 0 registros</span>
                <div className="HistorialVisitas__pagination-controls">
                    <button disabled>Primero</button>
                    <button disabled>{'<'}</button>
                    <button disabled>{'>'}</button>
                    <button disabled>Último</button>
                </div>
            </div>

        </div>

        </div>
        
    );
};

export default HistorialVisitas;
