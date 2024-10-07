import React from 'react';
import "./modalnavtop.css";

const Modalnavtop = ({ onClose, onConfirm }) => {
    return (
        <div className="modal-cerrarsesion">
            <div className="modal-hijo">
                <div className='titulo'>
                    <h1>¿Estás seguro de cerrar sesión?</h1>
                </div>
                <div className="modal-botones">
                    <button className="btn-confirmar" onClick={onConfirm}>Sí</button>
                    <button className="btn-cancelar" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
}

export default Modalnavtop;
