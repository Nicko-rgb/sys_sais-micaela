import React from 'react';
import axios from 'axios';

const BorrarCita = ({ citaData, close }) => {

    const handleDelete = async () => {
        try {
            // Realiza la solicitud para borrar la cita
            await axios.delete(`http://localhost:5000/api/delete-citas-ninio/${citaData.id}`);

            console.log('Cita borrada con exito');
            close();
        } catch (error) {
            console.error('Error al borrar cita:', error);
            alert('Hubo un problema al borrar la cita. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="borrar-cita">
            <div className="contend">
                <h2>Borrar cita</h2>
                <p style={{textAlign: 'center'}}>¿Estás seguro de que deseas borrar esta cita para <span>{citaData.nombres} {citaData.apellidos}</span>  ?</p>
                <div className="btns">
                    <button onClick={close} className="btn btn-cancel">Cancelar</button>
                    <button onClick={handleDelete} className="btn btn-delete">Borrar</button>
                </div>
            </div>
        </div>
    );
};

export default BorrarCita;
