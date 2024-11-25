import React from 'react';
import './info.css'

const InfoPersonalModal = ({ personals, cerrarModal }) => {
    if (!personals) return null;

    return (
        <div className='content-info' onClick={(e) => e.stopPropagation()}>
            <div className="flecha"></div>
            <h3>{`${personals.paterno} ${personals.materno}, ${personals.nombres}`}</h3>
            <div className="datos">
                <div>
                    <p><b>DNI:</b> {personals.dni}</p>
                    <p><b>CONDICON:</b> {personals.condicion}</p>
                    <p><b>PROFESION:</b> {personals.profesion}</p>
                </div>
                <div>
                    <p><b>SERVICIO:</b> {personals.servicio}</p>
                    <p><b>TIPO PERSONAL:</b> {personals.tipo_user}</p>
                </div>
            </div>
            <div className="box-btn">
                <button className='btn-save' onClick={cerrarModal}>ACEPTAR</button>
            </div>
        </div>
    );
};

export default InfoPersonalModal;
