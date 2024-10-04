import React from 'react';
import './info.css'

const InfoPersonalModal = ({ personal, cerrarModal }) => {
    if (!personal) return null;

    return (
        <div className='info-personal' onClick={cerrarModal}>
            <div className='content' onClick={(e) => e.stopPropagation()}>
                <h2>{`${personal.paterno} ${personal.materno} ${personal.nombres}`}</h2>
                <p><strong>Condición:</strong> {personal.condicion}</p>
                <p><strong>DNI:</strong> {personal.dni}</p>
                <p><strong>Profeción:</strong> {personal.profesion}</p>
                <button className='btn-save' onClick={cerrarModal}>ACEPTAR</button>
            </div>
        </div>
    );
};

export default InfoPersonalModal;
