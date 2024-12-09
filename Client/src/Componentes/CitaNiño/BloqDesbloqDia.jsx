import React from 'react';

// BloqDesbloqDia component
const BloqDesbloqDia = ({ isModalOpen, modalAction, selectedHorario, handleModalAction, closeModal, formatTime }) => {

    // Estilos en línea para el modal
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalContentStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
    };

    const modalActionsStyle = {
        display: 'flex',
        justifyContent: 'space-around',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const buttonCancelStyle = {
        backgroundColor: '#dc3545',
    };

    const buttonCancelHoverStyle = {
        backgroundColor: '#c82333',
    };

    return (
        <div>
            {/* Modal de confirmación */}
            {isModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h2>
                            {modalAction === 'block' ? '¿Estás seguro de que deseas bloquear esta hora?' : '¿Estás seguro de que deseas desbloquear esta hora?'}
                        </h2>
                        <p>{`Horario: ${formatTime(selectedHorario.hora_inicio)} - ${formatTime(selectedHorario.hora_fin)}`}</p>
                        <div style={modalActionsStyle}>
                            <button
                                style={buttonStyle}
                                onClick={handleModalAction}
                                onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                            >
                                {modalAction === 'block' ? 'Bloquear' : 'Desbloquear'}
                            </button>
                            <button
                                style={{...buttonStyle, ...buttonCancelStyle}}
                                onClick={closeModal}
                                onMouseOver={(e) => e.target.style.backgroundColor = buttonCancelHoverStyle.backgroundColor}
                                onMouseOut={(e) => e.target.style.backgroundColor = buttonCancelStyle.backgroundColor}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BloqDesbloqDia;
