import React, { useState } from 'react';
import "./modalnavtop.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Modalnavtop = ({ onClose, onConfirm }) => {
    const [isClosing, setIsClosing] = useState(false); // Estado para mostrar el modal de "Cerrando sesión"

    const handleConfirm = () => {
        setIsClosing(true); // Muestra el modal de "Cerrando sesión"
        setTimeout(() => {
            onConfirm(); // Llama la función de cierre de sesión después del retraso
        }, 1200); // Retraso de 1.2 segundos
    };

    return (
        <div className="modal-cerrarsesion">
            {isClosing ? (
                <div className="modal-hijo cerrando-sesion">
                    <AiOutlineLoading3Quarters
                        size={40}
                        className="icon-loading"
                        style={{ color: "#3498db", marginBottom: "10px" }}
                    />
                    <p>Cerrando sesión...</p>
                </div>
            ) : (
                <div className="modal-hijo">
                    <div className='titulo'>
                        <h1>¿Estás seguro de cerrar sesión?</h1>
                    </div>
                    <div className="modal-botones">
                        <button className="btn-confirmar" onClick={handleConfirm}>Sí</button>
                        <button className="btn-cancelar" onClick={onClose}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modalnavtop;
